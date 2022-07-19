const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')
const verifyToken = require('../controllers/verify')

router.get('/', postController.post_list)

router.post('/create', verifyToken, postController.post_create)

router.post('/:id/publish', verifyToken, postController.post_publish)

router.delete('/:id/unpublish', verifyToken, postController.post_unpublish)

router.delete('/:id/delete', verifyToken, postController.post_delete)

router.get('/:id', postController.post_get)

router.get('/:id/likes', postController.post_likes)

router.get('/:id/like', postController.post_like)

router.get('/:id/unlike', postController.post_unlike)

module.exports = router
