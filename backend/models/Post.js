const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    imageUrls: [
      {
        type: String,
      },
    ],
    content: {
      type: String,
      required: true,
    },
    enabled: {
      type: Boolean,
      required: true,
      default: true,
    },
    likes: [
      {
        type: String,
        default: [],
      },
    ],
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    strict: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// TEXT-index для поля content, чтобы работать с $text
PostSchema.index({ content: 'text' });

// Виртуальное поле для подсчета комментариев
PostSchema.virtual('commentCount', {
  ref: 'comments',         // имя модели Comment (коллекция 'comments')
  localField: '_id',       // поле в этой схеме
  foreignField: 'post',    // поле в модели Comment
  count: true,             // вернуть количество, а не массив
});

module.exports = mongoose.model("posts", PostSchema);

