const IPFSService = require('../services/ipfs.service');

class IPFSController {

    constructor() {
        this.service = IPFSService;
    }

    async save(req, res, next) {
        try {
            const data = req.body.data;
            const result = await IPFSService.save(data);
            res.status(201).json(result);

        } catch (error) {
            next(error);
        }
    }

    async get(req, res, next) {
        try {
            const hash = req.params.hash;
            const result = await IPFSService.get(hash);
            if (!result) {
                return res.status(404).json({ message: 'Data not found' });
            }
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new IPFSController();
