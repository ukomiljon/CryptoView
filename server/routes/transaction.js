const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.post('/api/v1/transaction/:address', transactionController.createTransaction);
router.get('/api/v1/transaction', transactionController.getTransactions);
 
module.exports = router;
