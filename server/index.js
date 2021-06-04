const express = require('express');
const app = express();

const { logger } = require('./start/logger');
require('./start/db')(logger);

require('./start/router')(app);
app.listen(5000);
logger.info('listening to port 5000');

const io = require('socket.io')(3001, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
});
require('./start/socket')(io);
