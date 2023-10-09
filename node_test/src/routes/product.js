const express = require('express')
const router = express.Router()
const ProductController = require('../app/controllers/ProductController')

router.get('/create',ProductController.create)
router.post('/save',ProductController.save)
router.get('/edit/:id',ProductController.edit)
router.put('/update/:id',ProductController.update)
router.delete('/delete/:id',ProductController.delete)
router.get('/', ProductController.index)
module.exports = router