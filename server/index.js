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

io.on('connection', (socket) => {
    socket.on('get-doc', (docId) => {
        const doc = createDoc(docId);
        socket.join(docId);
        socket.emit('load-doc', doc.data);

        socket.on('changes', (delta) => {
            socket.broadcast.to(docId).emit('receive-changes', delta);
        });

        socket.on('save-doc', async (data) => {
            await Doc.findByIdAndUpdate(docId, {
                data: data,
            });
        });
    });
});

const createDoc = async (id) => {
    if (id == null) return;
    const doc = await Doc.findById(id);
    if (doc) return doc;

    if (!doc) {
        const newDoc = new Doc({
            _id: id,
            data: defaultValue,
        });
        return newDoc;
    }
};
