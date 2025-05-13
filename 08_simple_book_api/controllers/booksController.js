const books = require('../models/books');

// Get all books
exports.getAllBooks = (req, res) => {
    res.json(books);
};

// Get a book by ID
exports.getBookById = (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) {
        return res.status(404).send("Book not found");
    }
    res.json(book);
};

// Add a new book
exports.addBook = (req, res) => {
    const { title, author } = req.body;
    if (!title || !author) {
        return res.status(400).send("Title and author are required");
    }
    const newBook = {
        id: books.length + 1,
        title,
        author
    };
    books.push(newBook);
    res.status(201).json(newBook);
};

// Update a book
exports.updateBook = (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) {
        return res.status(404).send("Book not found");
    }
    const { title, author } = req.body;
    if (title) book.title = title;
    if (author) book.author = author;
    res.json(book);
};

// Delete a book
exports.deleteBook = (req, res) => {
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
    if (bookIndex === -1) {
        return res.status(404).send("Book not found");
    }
    books.splice(bookIndex, 1);
    res.send("Book deleted successfully");
};