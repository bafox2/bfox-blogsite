const express = require('express')
const router = express.Router()
const commentController = require('../controllers/commentController')
const verifyToken = require('../controllers/verify')

/* GET users listing. */
router.get('/', commentController.comment_list)

router.post('/:id', commentController.comment_create)

router.put('/:id/edit', verifyToken, commentController.comment_edit)

router.delete('/:id/delete', verifyToken, commentController.comment_delete)

router.get('/:id', commentController.comment_get)

module.exports = router
