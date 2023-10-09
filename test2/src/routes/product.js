const express = require('express')
const router = express.Router()
const ProductController = require('../app/controllers/ProductController')
const upload = require('../utils/uploadImage')

router.delete('/delete/:id', ProductController.delete)
router.get('/edit/:id', ProductController.edit)
router.put('/update/:id', upload.single('image'), ProductController.update)
router.get('/create', ProductController.create)
router.post('/save', upload.single('image'), ProductController.save)
router.get('/:id', ProductController.detail)
router.get('/search/:name', ProductController.search)
router.get('/', ProductController.index)

module.exports = router