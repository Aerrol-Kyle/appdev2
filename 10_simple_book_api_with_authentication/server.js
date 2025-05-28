require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const connectDB = require('./config/db'); // Import the MongoDB connection function
const app = express();
const PORT = process.env.PORT || 3000;

connectDB(); // Connect to MongoDB Atlas

app.use(express.json()); // Middleware to parse JSON bodies

// Import and use auth routes
const authRoutes = require('./routes/authRoute');
app.use('/api/auth', authRoutes);

// Import and use book routes
const bookRoutes = require('./routes/booksRoute');
app.use('/api/books', bookRoutes); // Use book routes under /api/books

// Root route for API welcome message
app.get('/', (req, res) => {
    res.send("Simple Book API using Node.js and Express");
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});