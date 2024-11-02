const mongoose = require('mongoose');
const logger = require('../logger/logger'); // Adjust the path based on your structure

function connectToDatabase() {
    mongoose
        .connect(process.env.MONG_URI,{
            user: process.env.MONGODB_USERNAME || 'admin', // use default value if needed
            pass: process.env.MONGODB_PASSWORD || 'admin',
            authSource: process.env.MONGODB_AUTH_SOURCE || 'admin',
            useNewUrlParser: true,
            useUnifiedTopology: true,
            ssl: process.env.MONGODB_SSL === 'true',
        })
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
 