const { logger } = require('./start/logger');
require('./start/db')(logger);

const io = require('socket.io')(3001, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
});

io.on('connection', (socket) => {
    socket.on('get-doc', (docId) => {
        const data = '';
        socket.join(docId);
        socket.emit('load-doc', data);

        socket.on('changes', (delta) => {
            socket.broadcast.to(docId).emit('receive-changes', delta);
        });
    });
});
