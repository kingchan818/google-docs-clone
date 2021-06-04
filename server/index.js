const { Doc } = require('./models/doc');
const { logger } = require('./start/logger');

require('./start/db')(logger);

const defaultValue = '';
const io = require('socket.io')(3001, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
});
require('./start/socket')(io);
