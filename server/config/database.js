const mongoose = require('mongoose');
const logger = require('../logger/logger'); // Adjust the path based on your structure

function connectToDatabase() {
    mongoose
        .connect(process.env.MONG_URI)
        .then(() => { 
            logger.info('Connected to the database');
        })
        .catch((error) => {
            logger.error('Database connection error', {
                message: error.message,
                stack: error.stack,
            });
            process.exit(1); // Exit the process if unable to connect
        }); 
}

module.exports = connectToDatabase; // Export the function
 