const mongoose = require('mongoose');

const nftSchema = new mongoose.Schema({
  contractAddress: { type: String, required: true },
  tokenId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
}, { timestamps: true });

const NFTModel = mongoose.model('NFTEntity', nftSchema);

module.exports = NFTModel;
