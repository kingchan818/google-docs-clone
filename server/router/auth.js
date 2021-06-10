const express = require('express');
const router = express.Router();
const { User, UserValidator } = require('../models/user');
const b = require('bcrypt');
const { Schema } = require('mongoose');
//register

router.post('/register', async (req, res) => {
    const result = UserValidator(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);

    const existing_user = await User.findOne({ email: req.body.email }).select('-password');
    if (existing_user) return res.status(400).json({ message: 'user email is exist' });

    const salt = await b.genSalt(10);
    const password = await b.hash(req.body.password, salt);

    const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: password,
        doc: req.body.doc,
    });
    await user.save();

    res.json({ message: 'user created' });
});

router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('invalid credentials');
    const password = await b.compare(req.body.password, user.password);
    if (!password) return res.status(400).send('invalid credentials');
    const token = user.genToken();
    res.header('x-auth-token', token).send(token);
});

module.exports = router;
