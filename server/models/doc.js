const mongoose = require('mongoose');

const docSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    data: {
        type: Object,
        required: true,
    },
});

const Doc = mongoose.model('Docs', docSchema);

exports.Doc = Doc;
