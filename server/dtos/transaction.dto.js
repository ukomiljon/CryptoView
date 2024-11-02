const { validate } = require('class-validator');
const { IsEthereumAddress, IsOptional, IsDateString } = require('class-validator');
const web3 = require('web3');
 
// Custom validation functions
const isEthereumAddress = (address) => { 
    try {
        web3.utils.toChecksumAddress(address); 
        return true
    } catch (error) {        
        return null;  
    } 
};

const isDateString = (date) => {
    return !isNaN(Date.parse(date));
};

class TransactionsDto {
    constructor(address, startDate, endDate) {
        this.address = address;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    // Validation method
    validate() {
        const errors = [];
        
        if (!isEthereumAddress(this.address)) {
            errors.push({ property: 'address', message: "Invalid Ethereum address" });
        }
        
        if (this.startDate && !isDateString(this.startDate)) {
            errors.push({ property: 'startDate', message: "Start date must be a valid date" });
        }
        
        if (this.endDate && !isDateString(this.endDate)) {
            errors.push({ property: 'endDate', message: "End date must be a valid date" });
        }

        if (errors.length > 0) {
            throw new Error(JSON.stringify(errors));
        }
    }
}

// Function to validate DTO
const validateDto = async (dto) => {
    dto.validate();
};

module.exports = {
    TransactionsDto,
    validateDto,
};
