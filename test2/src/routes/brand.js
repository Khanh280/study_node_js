const express = require('express')
const router = express.Router()
const BrandController = require('../app/controllers/BrandController')

router.get('/create',BrandController.create)
router.post('/save',BrandController.save)
router.get('/edit/:id',BrandController.edit)
router.put('/update/:id',BrandController.update)
router.get('/delete/:id',BrandController.delete)
router.get('/',BrandController.index)

module.exports = router