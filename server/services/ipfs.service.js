const IPFSModel = require('../models/ipfsModel');
const axios = require('axios');

class IPFSService {

    async save(data) {
        try {
            const response = await axios.post(`${process.env.IPFS_PINATA_API_URL}`, { data }, {
                headers: {
                    pinata_api_key: process.env.PINATA_API_KEY,
                    pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
                },
            }); 
            
            // Create and save IPFS data in MongoDB
            const ipfsData = new IPFSModel({
                hash: response.data.IpfsHash,
                content: data,
            }); 
          
            return await ipfsData.save();
        } catch (error) {
            throw new Error(error);
        }
    }

    async get(hash) {
        try {
            const data = await IPFSModel.findOne({ hash });
            if (!data) {
                throw new Error('Data not found for the given hash');
            }
            return data;
        } catch (error) {
            throw new Error('Could not retrieve data from IPFS');
        }
    }
}

module.exports = new IPFSService();
