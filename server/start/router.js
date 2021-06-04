const express = require('express');
const cors = require('cors');
const login = require('../router/login');

module.exports = (app) => {
    app.use(
        cors({
            origin: 'http://localhost:3000',
            methods: ['PUT', 'GET', 'POST', 'DELETE'],
            credentials: true,
        })
    );
    app.use(express.json());
};
