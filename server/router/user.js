const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { Doc } = require('../models/doc');
const { User } = require('../models/user');

require('dotenv').config();
router.get('/', (req, res) => {
    const token = jwt.verify(req.header('x-auth-token'), process.env.JWT);
    if (!token) res.status(500).json({ message: 'Forbidden' });
    const user = User.findById(token._id).select('-password');
    const docs = user.docs;
    const doc = Doc.find({});
});

module.exports = router;
