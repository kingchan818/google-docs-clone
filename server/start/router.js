const express = require('express');
const cors = require('cors');
const app = express();
const login = require('../router/login');

app.use(
    cors({
        origin: 'http://localhost/',
        methods: ['PUT', 'GET', 'POST', 'DELETE'],
        credentials: true,
    })
);
app.use(express.json());
app.route('/login', login);

app.listen(3001);
