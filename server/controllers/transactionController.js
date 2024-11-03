const TransactionService = require('../services/transaction.service');
const { TransactionsDto, validateDto } = require('../dtos/transaction.dto');

class TransactionController { 
    
    async create(req, res, next) {
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

    async get(req, res, next) {
        try {             
            const dto = Object.assign(new TransactionsDto(), req.body);
            await validateDto(dto);
            const transactions = await  TransactionService.get(req.body);
            res.status(200).json(transactions);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new TransactionController();
