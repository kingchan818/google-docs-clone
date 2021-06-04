const express = require('express');
const cors = require('cors');
const app = express();
const login = require('../router/login');

app.use(express.json());
app.route('/login', login);

app.listen(3001);
