const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/', booksController.getBooks);
router.get('/:id', booksController.getBookById);
router.post('/', booksController.createBook);
router.patch('/:id', booksController.updateBook);
router.delete('/:id', booksController.deleteBook);

module.exports = router;