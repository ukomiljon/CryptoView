const Web3 = require('web3').default;;

const axios = require('axios');
const NFTModel = require('../models/nftModel'); 

class NFTService {
  constructor() {
    this.web3 = new Web3(process.env.WEB3_URL);
    this.contractABI = [
      {
        "constant": true,
        "inputs": [{ "name": "tokenId", "type": "uint256" }],
        "name": "tokenURI",
        "outputs": [{ "name": "", "type": "string" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      }
    ];
  }

  async get(contractAddress, tokenId) {
    try {
      const contract = this.createContractInstance(contractAddress);
      const tokenURI = await this.fetchTokenURI(contract, tokenId);
      const nftData = await this.fetchNFTData(tokenURI);
      const metadata = this.buildMetadata(contractAddress, tokenId, nftData);

      return await NFTModel.create(metadata); // Save the metadata to the database
    } catch (error) {
      throw new Error(error.message || 'Internal Server Error');
    }
  }

  async getAll() {
    try {
      return await NFTModel.find();
    } catch (error) {
      throw new Error('Error retrieving all NFTs');
    }
  }

  createContractInstance(contractAddress) {
    return new this.web3.eth.Contract(this.contractABI, contractAddress);
  }

  async fetchTokenURI(contract, tokenId) {
    const tokenURI = await contract.methods.tokenURI(tokenId).call();

    if (!tokenURI || typeof tokenURI !== 'string') {
      throw new Error('Invalid token URI returned from contract');
    }

    return tokenURI;
  }

  async fetchNFTData(tokenURI) {
    const response = await axios.get(tokenURI, {
      headers: { 'Accept': 'application/json' },
      transformResponse: [this.transformBinaryToJson]
    });

    return response.data;
  }

  transformBinaryToJson(data) {
    const bufferData = Buffer.from(data, 'binary');
    const jsonString = bufferData.toString('utf-8');

    return JSON.parse(jsonString);
  }

  buildMetadata(contractAddress, tokenId, data) {
    const { name, description, image } = data;
    const createdAt = new Date();
    const updatedAt = new Date();

    return {
      contractAddress,
      tokenId,
      name,
      description,
      imageUrl: image,
      createdAt,
      updatedAt
    };
  }
}

module.exports = new NFTService();
