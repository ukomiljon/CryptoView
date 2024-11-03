const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.post('/api/v1/transaction/:address', transactionController.create);
router.get('/api/v1/transaction', transactionController.get);
 
module.exports = router;
