const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    published: {
      type: Boolean,
      default: false,
    },
    imgUrl: {
      type: String,
      default: 'https://via.placeholder.com/150',
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
)

module.exports = mongoose.model('Post', PostSchema)
