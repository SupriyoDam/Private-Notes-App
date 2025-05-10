const express = require('express')
const router = express.Router()

const noteController = require('../controllers/noteController')
const upload = require('../middleware/uploadMiddleware')

router.post('/create', upload.array('files',3) , noteController.postNoteCreate)
router.get('/all', noteController.getUserNote)
router.get('/:noteId', noteController.getNoteById)
router.put('/:noteId', noteController.putUpdateNote)
router.delete('/:noteId', noteController.deleteNote)

module.exports = router