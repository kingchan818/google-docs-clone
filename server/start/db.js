const mongoose = require('mongoose');

module.exports = (logger) => {
    mongoose
        .connect('mongodb://localhost/google-doc-clone', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        })
        .then(() => logger.info('success'))
        .catch((e) => logger.error(e.message, e));
};
