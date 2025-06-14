const Book = require('../models/booksModel');
const sendBookCreatedEmail = require('../middlewares/sendemailMiddleware');

// Get all books
exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single book by ID
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new book
exports.createBook = async (req, res) => {
    try {
        const { title, author, year } = req.body;
        if (!title || !author || !year) {
            return res.status(400).json({ message: 'Title, author, and year are required' });
        }
        const newBook = new Book({ title, author, year });
        await newBook.save();

        // Send email notification (errors are logged, but do not block response)
        sendBookCreatedEmail(newBook);

        res.status(201).json(newBook);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a book
exports.updateBook = async (req, res) => {
    try {
        const { title, author, year } = req.body;
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        if (title) book.title = title;
        if (author) book.author = author;
        if (year) book.year = year;
        await book.save();
        res.json(book);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a book
exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json({ message: 'Book deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};