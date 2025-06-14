const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

// Joi schemas
const signupSchema = Joi.object({
    username: Joi.string().alphanum().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

const signinSchema = Joi.object({
    username: Joi.string().alphanum().min(3),
    email: Joi.string().email(),
    password: Joi.string().min(6).required()
}).or('username', 'email');

// Signup controller
exports.signup = async (req, res) => {
    // Validate request
    const { error } = signupSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { username, email, password } = req.body;

    try {
        // Check if user exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(409).json({ message: 'Username or email already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        // Handle duplicate key error from MongoDB
        if (err.code === 11000) {
            return res.status(409).json({ message: 'Username or email already exists' });
        }
        console.log(err); // For debugging
        res.status(500).json({ message: 'Server error' });
    }
};

// Signin controller
exports.signin = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        let user = null;
        if (username && !email) {
            user = await User.findOne({ username });
        } else if (email && !username) {
            user = await User.findOne({ email });
        } else {
            return res.status(400).json({ message: 'Provide either username or email, not both.' });
        }

        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign(
            { id: user._id, username: user.username, email: user.email },
            process.env.JWT_SECRET || 'your_jwt_secret',
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
};