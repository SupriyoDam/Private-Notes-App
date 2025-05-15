const express = require('express')
const router = express.Router()

const noteController = require('../controllers/noteController')
const upload = require('../middleware/uploadMiddleware')



/**
 * @swagger
 * /api/note/create:
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Note added successfully
 *       400:
 *         description: Note creation failed
 *       500:
 *         description: Server error
 */
router.post('/create', upload.array('files',3) , noteController.postNoteCreate)

/**
 * @swagger
 * /api/note/all:
 *   get:
 *     summary: get all notes for user logged in
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *     response:
 *       201: Note fetched successfully
 *     responses:
 *       200:
 *         description: Note found
 *       404:
 *         description: Note not found
 * 
 */
router.get('/all', noteController.getUserNote)


/**
 * @swagger
 * /api/note/{noteId}:
 *   get:
 *     summary: Fetch details of particular note by given id
 *     tags: [Notes]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: noteId
 *        required: true
 *        schema: 
 *          type: integer
 *        description: ID of the note
 *     responses:
 *       200:
 *         description: Note found
 *       404:
 *         description: Note not found
 * 
 */
router.get('/:noteId', noteController.getNoteById)

/**
 * @swagger
 * /api/note/{noteId}:
 *   put:
 *     summary: Updates created note based on ID
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: noteId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the note
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201: 
 *         description: Note updated
 */
router.put('/:noteId', noteController.putUpdateNote)


/**
 * @swagger
 * /api/note/{id}/attachment:
 *   put:
 *     summary: Add attachments to an existing note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the note
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Attachments added successfully
 *       400:
 *         description: No files uploaded
 *       404:
 *         description: Note not found
 *       500:
 *         description: Server error
 */
router.put('/:noteId/attachment', upload.array('files',2), noteController.addAttachmentToNote)

/**
 * @swagger
 * /api/note/{id}:
 *   delete:
 *     summary: deletes an existing note, along with its documents
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the note
 *     responses:
 *       201:
 *         description: Attachments added successfully
 *       400:
 *         description: No files uploaded
 *       404:
 *         description: Note not found
 *       500:
 *         description: Server error
 */
router.delete('/:noteId', noteController.deleteNote)

module.exports = router