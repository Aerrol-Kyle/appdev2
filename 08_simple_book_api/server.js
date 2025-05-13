require('dotenv').config(); // Load environment variables
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; // Use PORT from .env or default to 3000

// Middleware to parse JSON data
app.use(express.json());

// Import routes
const bookRoutes = require('./routes/books');

// Use routes
app.use('/api/books', bookRoutes);

// Root route
app.get('/', (req, res) => {
    res.send("Simple Book API using Node.js and Express");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});