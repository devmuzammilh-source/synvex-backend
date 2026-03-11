const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res) => {
    try {
        const { firstName, lastName, phone, email, password, devicetype } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: "Email is already registered",
                status: "error"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            firstName,
            lastName,
            phone,
            email,
            password: hashedPassword,
            devicetype
        });
        await user.save();
        res.status(201).json({
            message: "User registered successfully",
            status: "success"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error registering user",
            error: error.message
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password, devicetype } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
                status: "error"
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password",
                status: "error"
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET || "your_secret_key",
            { expiresIn: "7d" }
        );

        res.status(200).json({
            message: "Login successful",
            status: "success",
            // token,
            // user 
            
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error logging in",
            error: error.message
        });
    }
});

module.exports = router;