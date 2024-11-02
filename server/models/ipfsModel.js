const mongoose = require('mongoose');

const ipfsSchema = new mongoose.Schema({
    hash: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const IPFSModel = mongoose.model('IPFSEntity', ipfsSchema);

module.exports = IPFSModel;
