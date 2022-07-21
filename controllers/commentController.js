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
      return res.json({ errors: errors.array() })
    }
    console.log(req.query, 'req.params')
    Comment.create(
      {
        comment: req.body.comment,
        user: req.body.user,
        post: req.params.post_id || req.query.post_id,
      },
      (err, comment) => {
        if (err) return res.json(err)
        res.json(comment)
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
  Comment.findById(req.params.id, (err, comment) => {
    if (err) return res.json(err)
    return res.json(comment)
  })
}

exports.comment_edit = [
  (req, res, next) => {
    jwt.verify(req.token, process.env.PASSPORT_KEY, (err, authData) => {
      if (err) res.sendStatus(400).json(err)
      req.authData = authData
      next()
    })
  },
  body('comment', 'Comment is required').trim().isLength({ min: 2 }).escape(),
  body('user', 'Username is required').trim().isLength({ min: 2 }).escape(),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() })
    }
    Comment.findByIdAndUpdate(req.params.id, {
      comment: req.body.comment,
      user: req.body.user,
      post: req.params.post_id || req.query.post_id,
    })
      .populate('user')
      .exec((err, comment) => {
        if (err) {
          return res.json(err)
        }
        return res.json(comment)
      })
  },
]
