const axios = require('axios');
const { TransactionModel, Transaction } = require('../models/transactionModel'); 
 
class TransactionService {
    async save(address) {
        
        try {
            console.log(address);
            console.log(process.env.ETHERSCAN_API_URL);
            console.log(process.env.ETHERSCAN_API_KEY);
            
            const response = await axios.get(process.env.ETHERSCAN_API_URL, {
                params: {
                    module: 'account',
                    action: 'txlist',
                    address,
                    startblock: 0,
                    endblock: 99999999,
                    sort: 'desc',
                    apikey: process.env.ETHERSCAN_API_KEY,
                },
            });

            console.log("response:",response);

            const transactions = response.data.result.slice(0, 5).map((tx) => ({
                address,
                hash: tx.hash,
                from: tx.from,
                to: tx.to,
                value: tx.value,
                timestamp: new Date(parseInt(tx.timeStamp) * 1000),
            }));

            console.log("transactions:",transactions);

            await TransactionModel.insertMany(transactions); 

            return transactions;
        } catch (error) { 
            throw new Error('Error fetching transactions');  
        }
    }

    async get(query) {
        const { address, startDate, endDate } = query;

        const filter = { address };

        // Apply date range filtering if `startDate` or `endDate` is provided
        if (startDate || endDate) {
            filter.timestamp = {};
            if (startDate) filter.timestamp['$gte'] = new Date(startDate);
            if (endDate) filter.timestamp['$lte'] = new Date(endDate);
        }

        return await TransactionEntity.find(filter); // Using Mongoose to find documents
    }
}

module.exports = new TransactionService();
