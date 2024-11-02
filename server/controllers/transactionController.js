const TransactionService = require('../services/transaction.service');
const { TransactionsDto, validateDto } = require('../dtos/transaction.dto');

class TransactionController {
  
    constructor() {
        this.transactionService = TransactionService; 
    }

    async createTransaction(req, res, next) {
        try { 
            const dto = Object.assign(new TransactionsDto(), req.params);
            await validateDto(dto);

            const { address } = req.params;

            const transaction = await  TransactionService.save(address);
            res.status(201).json(transaction);
        } catch (error) {
            next(error);
        }
    }

    async getTransactions(req, res, next) {
        try {
            const transactions = await  this.transactionService.get(req.query);
            res.status(200).json(transactions);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new TransactionController();
