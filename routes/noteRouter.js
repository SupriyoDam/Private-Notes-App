const express = require('express')
const router = express.Router()

const noteController = require('../controllers/noteController')

router.post('/create', noteController.postNoteCreate)
router.get('/all', noteController.getUserNote)
router.put('/:noteId', noteController.putUpdateNote)
router.delete('/:noteId', noteController.deleteNote)

module.exports = router