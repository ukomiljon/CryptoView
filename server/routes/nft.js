const express = require('express');
const router = express.Router();
const nftController = require('../controllers/nftController');

router.get('/api/v1/nft/metadata', nftController.save_get); 
router.get('/api/v1/nft/all', nftController.get);
 
module.exports = router;
