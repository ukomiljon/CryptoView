const mongoose = require("mongoose");

// Define the Transaction class
class Transaction {
    constructor(address, hash, timestamp, from, to, value) {
        this.address = address;
        this.hash = hash;
        this.timestamp = timestamp;
        this.from = from;
        this.to = to;
        this.value = value;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    // Custom validation function
    static validate(data) {
        const errors = [];
        
        if (!data.address || typeof data.address !== 'string' || data.address.trim() === "") {
            errors.push("Address is required");
        }
        if (!data.hash || typeof data.hash !== 'string' || data.hash.trim() === "") {
            errors.push("Hash is required");
        }
        if (!data.timestamp || !(data.timestamp instanceof Date) || isNaN(data.timestamp)) {
            errors.push("Timestamp is required and must be a valid date");
        }
        if (!data.from || typeof data.from !== 'string' || data.from.trim() === "") {
            errors.push("From address is required");
        }
        if (!data.to || typeof data.to !== 'string' || data.to.trim() === "") {
            errors.push("To address is required");
        }
        if (!data.value || typeof data.value !== 'string' || data.value.trim() === "") {
            errors.push("Value is required");
        }
        
        return errors;
    }
}

// Create Mongoose schema
const transactionSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
    },
    hash: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        required: true,
    },
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
}, { timestamps: true });  

// Create Mongoose model
const TransactionModel = mongoose.model("Transaction", transactionSchema);

module.exports = { TransactionModel, Transaction };
