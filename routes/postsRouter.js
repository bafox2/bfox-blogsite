const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')
const verifyToken = require('../controllers/verify')

router.get('/', postController.post_list)

router.post('/create', verifyToken, postController.post_create)

router.put('/:id/publish', verifyToken, postController.post_publish)

router.put('/:id/unpublish', verifyToken, postController.post_unpublish)

router.delete('/:id/delete', verifyToken, postController.post_delete)

router.put('/:id/edit', verifyToken, postController.post_edit)

router.get('/:id', postController.post_get)

router.get('/:id/likes', postController.post_likes)

router.put('/:id/like', verifyToken, postController.post_like)

router.put('/:id/unlike', verifyToken, postController.post_unlike)

module.exports = router
