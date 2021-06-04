module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.on('get-doc', async (docId) => {
            const doc = await createDoc(docId);
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
            await newDoc.save();
            return newDoc;
        }
    };
};
