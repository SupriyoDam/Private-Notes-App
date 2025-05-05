const express = require('express')
const router = express.Router()

const adminController = require('../controllers/adminController')

router.get('/users', adminController.listUsers)
router.get('/notes', adminController.listNotes)

module.exports = router