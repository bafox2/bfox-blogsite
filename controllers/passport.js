const passport = require('passport')
const bcryptjs = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/user')

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err)
      }
      if (!user) return done(null, false, { message: 'Incorrect username' })
      bcryptjs.compare(password, user.password, (err, res) => {
        if (err) return done(err)
        // Passwords match, log user in!
        if (res) return done(null, user)
        // Passwords do not match!
        else return done(null, false, { message: 'Incorrect password' })
      })
    })
  })
)

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.PASSPORT_KEY,
    },
    (jwt_payload, done) => {
      return done(null, jwt_payload)
    }
  )
)
