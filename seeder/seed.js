const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');
require('dotenv').config();

const User = require('../models/userModel');
const Book = require('../models/booksModel');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  // These options are no longer needed for Mongoose 6+
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

const seed = async () => {
  try {
    // Clear collections
    await User.deleteMany();
    await Book.deleteMany();

    // Create fake users
    const users = [];

    for (let i = 0; i < 5; i++) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      const user = new User({
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: hashedPassword
      });
      await user.save();
      users.push(user);
    }

    // Create fake books (assigned to random users)
    for (let i = 0; i < 10; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const book = new Book({
        title: faker.lorem.words(3),
        author: faker.person.fullName(),
        year: faker.date.past({ years: 30 }).getFullYear(),
        user: randomUser._id // ✅ uses 'user' as required by schema
      });
      await book.save();
    }

    console.log('✅ Seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
};

seed();
