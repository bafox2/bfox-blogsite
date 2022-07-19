const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/', userController.user_list)

router.post('/login', userController.login_post)

router.post('/signup', userController.signup_post)

router.get('/:id', userController.user_get)

module.exports = router
