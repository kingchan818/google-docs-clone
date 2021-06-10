const { Doc } = require('../models/doc');
const { User } = require('../models/user');
const defaultValue = '';

module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.on('get-doc', async (docId, userId) => {
            const doc = await createDoc(docId, userId);
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

    const createDoc = async (id, userId) => {
        if (id == null) return;
        const doc = await Doc.findById(id);
        if (doc) return doc;

        if (!doc) {
            const newDoc = new Doc({
                _id: id,
                data: defaultValue,
            });
            User.findByIdAndUpdate(userId, { doc: id });
            await newDoc.save();
            return newDoc;
        }
    };
};
