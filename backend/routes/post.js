// routes/post.js
const express  = require("express");
const router   = express.Router();
const passport = require("passport");

// Импортируем наш конфиг multer+Cloudinary
const parser   = require("../config/multerCloudinary");

// Import controllers
const {
  createPost,
  updatePost,
  updatePostLikes,
  deletePost,
  getPostById,
  getPostsFilterParams,
} = require("../controllers/post");

// @route   POST api/posts
// @desc    Create post (с поддержкой загрузки до 5 изображений)
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  parser.array("images", 5),   // ← вот он: поле "images" и максимум 5 файлов
  createPost
);

// @route   PUT api/posts/:id
// @desc    Update post
// @access  Private
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updatePost,
);

// @route   PATCH api/posts/:id
// @desc    Update post likes
// @access  Private
router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updatePostLikes,
);

// @route   DELETE api/posts/:id
// @desc    DELETE existing post
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deletePost,
);

// @route   GET api/posts
// @desc    GET appropriate filtered posts
// @access  Public
router.get("/", getPostsFilterParams);

// @route   GET api/posts/:id
// @desc    GET existing post
// @access  Public
router.get("/:id", getPostById);

module.exports = router;
