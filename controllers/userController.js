const passport = require('passport')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const { body, validationResult } = require('express-validator')
const User = require('../models/user')

exports.user_list = (req, res, next) => {
  User.find().exec((err, users) => {
    if (err) res.json(err)
    res.json(users)
  })
}

exports.login_post = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        message: 'Something is wrong, we could not verify your credentials.',
        user,
      })
    }

    jwt.sign(
      { user },
      process.env.PASSPORT_KEY,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) return res.status(400).json(err)
        res.json({
          token: token,
          user: {
            id: user.id,
            username: user.username,
          },
        })
      }
    )
  })(req, res, next)
}

exports.signup_post = [
  body('username', 'Username is required').trim().isLength({ min: 2 }).escape(),
  body('password', 'Password is required').trim().isLength({ min: 2 }).escape(),
  body('confirmPassword', 'Confirm Password is required to be same as password')
    .trim()
    .isLength({ min: 2 })
    .escape()
    .custom(async (value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match')
      }
      return true
    }),

  async (req, res, next) => {
    ;() => console.log(req.body)
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() })
    }
    const userExistsCheck = User.findOne({ username: req.body.username })
    if (userExistsCheck.length > 0) {
      return res.json({
        message: 'Username already exists',
      })
    }
    console.log('making new user')
    User.create(
      {
        username: req.body.username,
        password: await getHashedPassword(req.body.password),
      },
      (err, user) => {
        if (err) return res.json(err)

        jwt.sign(
          { user },
          process.env.PASSPORT_KEY,
          { expiresIn: '1h' },
          (err, token) => {
            if (err) return res.json(err)
            return res.json({
              token,
              user: {
                id: user.id,
                username: user.username,
              },
            })
          }
        )
      }
    )
  },
]

exports.user_get = (req, res, next) => {
  User.findById(req.params.id).exec((err, user) => {
    if (err) {
      res.json(err)
    } else {
      res.json(user)
    }
  })
}

getHashedPassword = async (password) => {
  const result = await bcryptjs
    .hash(password, 10)
    .then((hashedPassword) => ({ hashedPassword }))
    .catch((error) => ({ error }))
  if (result.error) throw result.error

  return result.hashedPassword
}