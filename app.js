//imports
require('dotenv').config()
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
var helmet = require('helmet')
const cors = require('cors')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var createError = require('http-errors')
require('./controllers/passport')

//conection
const mongoDb = process.env.SECRET_KEY
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'mongo connection error'))

//auth
require('passport')

//routers
const commentsRouter = require('./routes/commentsRouter')
const usersRouter = require('./routes/usersRouter')
const postsRouter = require('./routes/postsRouter')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.resolve(__dirname, './client/build')))
app.use(helmet())

app.use('/comments', commentsRouter)
app.use('/users', usersRouter)
app.use('/posts', postsRouter)

app.get('/ping', function (req, res) {
  return res.send('pong')
})

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/', 'index.html'))
})

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
})

module.exports = app
