const Post = require('../models/post')
const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const createDOMPurify = require('dompurify')
const { JSDOM } = require('jsdom')

exports.post_list = (req, res, next) => {
  console.log('post list route')
  Post.find()
    .populate('user likes comments')
    .exec((err, posts) => {
      if (err) res.json(err)
      res.json(posts)
    })
}

//where is authdata coming from
exports.post_create = [
  (req, res, next) => {
    jwt.verify(req.token, process.env.PASSPORT_KEY, (err, authData) => {
      if (err) res.sendStatus(400).json(err)
      req.authData = authData
      next()
    })
  },
  (req, res, next) => {
    const window = new JSDOM('').window
    const DOMPurify = createDOMPurify(window)
    const richlySanitizedText = DOMPurify.sanitize(req.body.content, {
      ALLOWED_TAGS: [
        'p',
        'br',
        'hr',
        'strong',
        'em',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        's',
        'u',
        'ul',
        'ol',
        'li',
        'a',
        'img',
        'blockquote',
        'pre',
        'code',
        'div',
        'span',
      ],
      ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'style'],
    })
    req.body.content = richlySanitizedText
    next()
  },
  body('title', 'Title is required').trim().isLength({ min: 2 }).escape(),
  body('content', 'Content is required').trim().isLength({ min: 2 }),
  body('imgUrl', 'img is required').trim().isLength({ min: 2 }).escape(),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log(errors.array())
      return res.json({ errors: errors.array() })
    }
    const { title, content, imgUrl, published } = req.body
    console.log(published)
    Post.create(
      {
        title,
        content,
        imgUrl,
        user: req.authData.user._id,
        published,
      },
      (err, newPost) => {
        if (err) {
          return res.json(err)
        }
        newPost.populate('user', (err, newPost) => {
          if (err) {
            return res.json(err)
          }
          return res.json(newPost)
        })
      }
    )
  },
]

exports.post_edit = [
  (req, res, next) => {
    jwt.verify(req.token, process.env.PASSPORT_KEY, (err, authData) => {
      if (err) res.sendStatus(400).json(err)
      req.authData = authData
      next()
    })
  },
  (req, res, next) => {
    const window = new JSDOM('').window
    const DOMPurify = createDOMPurify(window)
    const richlySanitizedText = DOMPurify.sanitize(req.body.content, {
      ALLOWED_TAGS: [
        'p',
        'br',
        'strong',
        'em',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        's',
        'u',
        'ul',
        'ol',
        'li',
        'a',
        'img',
        'blockquote',
        'pre',
        'code',
        'div',
        'span',
      ],
      ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'style'],
    })
    req.body.content = richlySanitizedText
    next()
  },
  body('title', 'Title is required').trim().isLength({ min: 2 }).escape(),
  body('content', 'Content is required').trim().isLength({ min: 2 }),
  body('imgUrl', 'img is required').trim().isLength({ min: 2 }).escape(),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log(errors.array())
      return res.json({ errors: errors.array() })
    }
    const { title, content, imgUrl, published } = req.body
    const post = new Post({
      title,
      content,
      imgUrl,
      user: req.authData.user._id,
      published,
      _id: req.params.id,
    })
    Post.findByIdAndUpdate(req.params.id, post, { new: true }, (err, post) => {
      if (err) {
        return res.json(err)
      }
      post.populate('user', (err, post) => {
        if (err) {
          return res.json(err)
        }
        return res.json(post)
      })
    })
  },
]

exports.post_delete = (req, res, next) => {
  ;(res, req, next) => {
    jwt.verify(req.token, process.env.PASSPORT_KEY, (err, authData) => {
      if (err) res.sendStatus(400).json(err)
      req.authData = authData
      next()
    })
  }

  Post.findByIdAndRemove(req.params.id, (err) => {
    if (err) return res.json(err)
    return res.json({
      message: 'Post deleted successfully',
    })
  })
}

exports.post_publish = (req, res, next) => {
  ;(res, req, next) => {
    jwt.verify(req.token, process.env.PASSPORT_KEY, (err, authData) => {
      if (err) res.sendStatus(400).json(err)
      req.authData = authData
      next()
    })
  }
  Post.findByIdAndUpdate(
    { _id: req.params.id },
    { published: true },
    { new: true }
  )
    .populate('user')
    .exec((err, post) => {
      if (err) return res.json(err)
      return res.json(post)
    })
}

exports.post_unpublish = (req, res, next) => {
  ;(res, req, next) => {
    jwt.verify(req.token, process.env.PASSPORT_KEY, (err, authData) => {
      if (err) res.sendStatus(400).json(err)
      req.authData = authData
      next()
    })
  }
  Post.findByIdAndUpdate(
    { _id: req.params.id },
    { published: false },
    { new: true }
  )
    .populate('user')
    .exec((err, post) => {
      if (err) return res.json(err)
      return res.json(post)
    })
}

exports.post_get = (req, res, next) => {
  console.log('getting post', req.params)
  Post.findById(req.params.id)
    .populate('user likes comments')
    .exec((err, post) => {
      if (err) return res.json(err)
      return res.json(post)
    })
}

exports.post_like = (req, res, next) => {
  Post.findByIdAndUpdate(
    req.params.id,
    { $push: { likes: req.body.user_id } },
    { new: true },
    (err, post) => {
      if (err) return res.json(err)
      return res.json(post.likes)
    }
  )
}

exports.post_unlike = (req, res, next) => {
  Post.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.body.user_id } },
    { new: true },
    (err, post) => {
      if (err) return res.json(err)
      return res.json(post.likes)
    }
  )
}

exports.post_likes = (req, res, next) => {
  Post.findById(req.params.id).exec((err, post) => {
    if (err) return res.json(err)
    return res.json(post.likes)
  })
}
