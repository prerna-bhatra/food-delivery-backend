// controllers/authController.js
const { User } = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.signup = async (req, res) => {
    try {
        const { name, email, password, userType = "customer" } = req.body;
        console.log({ name, email, password });
        const existingUser = await User.findOne({ where: { email } }); // Use where clause to specify conditions

        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username: name,
            email,
            password: hashedPassword,
            userType
        });
        await newUser.save();

        res.status(201).json({ message: 'Signup successful' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } }); // Use where clause to specify conditions
        console.log("user", user);
        if (user && bcrypt.compareSync(password, user.password)) {

            const token = jwt.sign(
                {
                    userId: user._id,
                    email: user.email,
                    name: user.name,
                    userType: user.userType
                },
                process.env.JWT_SECRET, // Replace with a secure secret key
                { expiresIn: '24h' } // Token expiration time
            );

            console.log("token", token);

            res.status(200).json({
                message: 'Login successful', data: {
                    token, user: {
                        name: user.username,
                        email: user.email,
                        userType: user.userType,
                        userId: user.id,

                    }
                }
            });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
