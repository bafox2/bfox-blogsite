//imports
require('dotenv').config()
const express = require('express')
const path = require('path')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
var helmet = require('helmet')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var createError = require('http-errors')
var User = require('./models/userModel')

//conection
const mongoDb = process.env.SECRET_KEY
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'mongo connection error'))

//routers
var indexRouter = require('./routes/indexRouter')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(helmet())
app.use(express.static(path.join(__dirname, 'public')))

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) return done(err)
      if (!user) return done(null, false, { message: 'Incorrect username' })
      bcrypt.compare(password, user.password, (err, res) => {
        if (err) return done(err)
        // Passwords match, log user in!
        if (res) return done(null, user)
        // Passwords do not match!
        else return done(null, false, { message: 'Incorrect password' })
      })
    })
  })
)

//serializes the user then stores it in the session, then deserializes the user

passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((id, done) =>
  User.findById(id, (err, user) => done(err, user))
)

// Secret value should be a process env value
app.use(session({ secret: 'authapp', resave: false, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.urlencoded({ extended: false }))

//sets the user object from anywhere in app
app.use((req, res, next) => {
  res.locals.currentUser = req.user
  next()
})

app.use('/', indexRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
