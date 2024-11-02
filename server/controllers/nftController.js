const NFTService = require('../services/nft.service');

class NFTController {

    constructor() {
        this.service = NFTService;
    }

    async save_get(req, res, next) {
        const { contractAddress, tokenId } = req.query;
        try {
            const result = await NFTService.get(contractAddress, tokenId); 
            res.status(201).json(result);

        } catch (error) {
            next(error);
        }
    }

    async get(req, res, next) {
        try {
            const result = await NFTService.getAll();
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new NFTController();
