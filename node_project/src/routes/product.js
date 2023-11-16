const express = require('express')
const router = express.Router()
const ProductController = require('../app/controllers/ProductController')
const upload = require('../utils/uploadImage')
const middleware = require('../app/middlewareController')

// router.get('/login', ProductController.login)
// router.get('/logout', ProductController.logout)
// router.get('/register', ProductController.register)
// router.post('/login', ProductController.authenticate)
// router.post('/register', ProductController.registerUse)
router.delete('/delete/:id',middleware.roleAdmin, ProductController.delete)
router.get('/edit/:id',middleware.roleAdmin, ProductController.edit)
router.put('/update/:id',middleware.roleAdmin, upload.single('image'), ProductController.update)
router.get('/create',middleware.roleAdmin, ProductController.create)
router.post('/save',middleware.roleAdmin, upload.single('image'), ProductController.save)
router.get('/:id', ProductController.detail)
router.get('/search/:name', ProductController.search)
// router.get('/', middleware.verifyToken, ProductController.list)


module.exports = router