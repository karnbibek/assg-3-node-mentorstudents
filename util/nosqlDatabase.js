const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/companies", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    retryWrites: true,
});

const connection = mongoose.connection;

module.exports = connection;