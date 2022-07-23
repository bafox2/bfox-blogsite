const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Comment = require('../models/comment')
const Post = require('../models/post')
const { body, validationResult } = require('express-validator')

//might need to filter by id of post
exports.comment_list = (req, res, next) => {
  Comment.find().exec((err, comments) => {
    if (err) res.json(err)
    res.json(comments)
  })
}

exports.comment_create = [
  body('comment', 'Comment is required').trim().isLength({ min: 2 }).escape(),
  body('user', 'Username is required').trim().isLength({ min: 2 }).escape(),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log(errors.array(), 'errrors')
      return res.json({ errors: errors.array() })
    }

    Comment.create(
      {
        comment: req.body.comment,
        user: req.body.user,
        post: req.params.id,
      },
      (err, newComment) => {
        console.log(newComment, 'comment from comment create')
        if (err) return res.json(err)
        res.json(newComment)
      }
    )
  },
]

exports.comment_delete = function (req, res) {
  Comment.findByIdAndRemove(req.params.id, (err) => {
    if (err) return res.json(err)
    return res.json({
      message: 'Comment deleted successfully',
    })
  })
}

exports.comment_get = function (req, res) {
  Comment.find({ post: req.params.id }).exec((err, comments) => {
    if (err) return res.json(err)
    return res.json(comments)
  })
}

exports.comment_edit = [
  (req, res, next) => {
    jwt.verify(req.token, process.env.PASSPORT_KEY, (err, authData) => {
      if (err) res.sendStatus(402).json(err)
      req.authData = authData
      next()
    })
  },
  body('comment', 'Comment is required').trim().isLength({ min: 2 }).escape(),
  (req, res, next) => {
    console.log(req.body, 'req.body')
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() })
    }
    const update = {
      comment: req.body.comment,
    }
    //works as intended until here, need to modify what the
    // params it is look at is
    Comment.findByIdAndUpdate(req.params.id, update, (err, comment) => {
      console.log(comment, 'comment from comment edit')
      if (err) {
        return res.json(err)
      } else {
        res.json(comment)
      }
    })
  },
]
