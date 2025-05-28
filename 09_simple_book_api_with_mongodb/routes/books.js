const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');

// Define routes and map them to controller functions
router.get('/', booksController.getAllBooks);
router.get('/:id', booksController.getBookById);
router.post('/', booksController.addBook);
router.patch('/:id', booksController.updateBook);
router.delete('/:id', booksController.deleteBook);

module.exports = router;