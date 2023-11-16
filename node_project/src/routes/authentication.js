const express = require('express')
const router = express.Router()
const UserController = require('../app/controllers/UserController')
router.get('/login',UserController.login)
router.get('/logout', UserController.logout)
router.post('/login', UserController.authenticate)
module.exports = router