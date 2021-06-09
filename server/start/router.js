const express = require('express');
const cors = require('cors');
//const user = require('../router/user');
const auth = require('../router/auth');

module.exports = (app) => {
    app.use(express.json());
    app.use(
        cors({
            origin: 'http://localhost:3000',
            methods: ['PUT', 'GET', 'POST', 'DELETE'],
            credentials: true,
        })
    );
    //app.use('/api/user', user);
    app.use('/api/auth', auth);
};
