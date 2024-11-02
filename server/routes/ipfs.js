const express = require('express');
const router = express.Router();
const ipfsController = require('../controllers/ipfsController');

router.post('/api/v1/ipfs/store', ipfsController.save); 
router.get('/api/v1/ipfs/:hash', ipfsController.get);
 
module.exports = router;
