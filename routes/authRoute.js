const express = require('express')
const router = express.Router()

const authController = require('../controllers/authController')

router.post('/register', authController.postRegisterUser)
router.post('/login', authController.postLoginUser)

module.exports = router