const Post = require("../models/Post");
const queryCreator = require("../commonHelpers/queryCreator");
const filterParser = require("../commonHelpers/filterParser");
const _ = require("lodash");

// CREATE
exports.createPost = async (req, res, next) => {
  try {
    // Клонируем тело запроса и добавляем пользователя
    const postData = _.cloneDeep(req.body);
    postData.user = req.user.id;

    // Если есть файлы из multer-cloudinary, сохраняем их URL
    if (req.files && req.files.length > 0) {
      postData.imageUrls = req.files.map(file => file.path);
    }

    // Создаём и сохраняем новый пост
    const newPost = new Post(queryCreator(postData));
    const saved = await newPost.save();

    // После сохранения делаем populate для user и commentCount
    const fullPost = await Post.findById(saved._id)
      .populate("user", "firstName lastName email avatarUrl")
      .populate("commentCount");

    res.json(fullPost);
  } catch (err) {
    console.error("createPost error:", err);
    res.status(400).json({ message: `Error happened on server: "${err.message}" ` });
  }
};

// UPDATE CONTENT
exports.updatePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (!post) {
        return res.status(404).json({ message: `Post with id "${req.params.id}" is not found.` });
      }
      if (!(req.user.isAdmin || req.user.id === post.user.toString())) {
        return res.status(403).json({ message: `You don't have permission to perform this action.` });
      }

      const updatedData = queryCreator(_.cloneDeep(req.body));

      return Post.findOneAndUpdate(
        { user: req.user.id, _id: req.params.id },
        { $set: updatedData },
        { new: true }
      )
        .populate("user", "firstName lastName email avatarUrl")
        .populate("commentCount");
    })
    .then((updatedPost) => res.json(updatedPost))
    .catch((err) =>
      res.status(400).json({ message: `Error happened on server: "${err}" ` })
    );
};

// UPDATE LIKES
exports.updatePostLikes = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (!post) {
        return res.status(404).json({ message: `Post with id "${req.params.id}" is not found.` });
      }

      const likes = post.likes || [];
      const idx = likes.indexOf(req.user.id);
      if (idx > -1) likes.splice(idx, 1);
      else likes.push(req.user.id);

      return Post.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { likes } },
        { new: true }
      )
        .populate("user", "firstName lastName email avatarUrl")
        .populate("commentCount");
    })
    .then((post) => res.json(post))
    .catch((err) =>
      res.status(400).json({ message: `Error happened on server: "${err}" ` })
    );
};

// DELETE
exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (!post) {
        return res.status(404).json({ message: `Post with id "${req.params.id}" is not found.` });
      }
      if (!(req.user.isAdmin || req.user.id === post.user.toString())) {
        return res.status(403).json({ message: `You don't have permission to perform this action.` });
      }
      return Post.deleteOne({ _id: req.params.id });
    })
    .then(() =>
      res.status(200).json({ message: `Post is successfully deleted from DB` })
    )
    .catch((err) =>
      res.status(400).json({ message: `Error happened on server: "${err}" ` })
    );
};

// GET SINGLE
exports.getPostById = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .populate("user", "firstName lastName email avatarUrl")
    .populate("commentCount")
    .then((post) => {
      if (!post) {
        return res.status(404).json({ message: `Post with id "${req.params.id}" is not found.` });
      }
      res.json(post);
    })
    .catch((err) =>
      res.status(400).json({ message: `Error happened on server: "${err}" ` })
    );
};

// GET LIST WITH FILTER/PAGINATION
exports.getPostsFilterParams = async (req, res, next) => {
  const { search, ...restQuery } = req.query;
  const mongooseQuery = filterParser(restQuery);

  if (search) {
    mongooseQuery.content = { $regex: search, $options: "i" };
  }

  const perPage = Number(req.query.perPage) || 10;
  const startPage = Number(req.query.startPage) || 1;
  const sort = req.query.sort || "date";

  try {
    const posts = await Post.find(mongooseQuery)
      .populate("user", "firstName lastName avatarUrl")
      .populate("commentCount")
      .skip(startPage * perPage - perPage)
      .limit(perPage)
      .sort(sort);

    const postsQuantity = await Post.countDocuments(mongooseQuery);

    res.json({ posts, postsQuantity });
  } catch (err) {
    res.status(400).json({ message: `Error happened on server: "${err}"` });
  }
};

