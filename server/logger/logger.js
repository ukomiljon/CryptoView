const winston = require('winston');

// Define the logger configuration
const logger = winston.createLogger({
    level: 'info', // Default logging level
    format: winston.format.combine(
        winston.format.timestamp(), // Adds a timestamp to logs
        winston.format.json() // Log in JSON format
    ),
    transports: [
        new winston.transports.Console({ // Log to console
            format: winston.format.simple(), // Customize output for console
        }),
        new winston.transports.File({ 
            filename: 'error.log', // Log errors to a file
            level: 'error', // Only log errors
            format: winston.format.json(),
        }),
        new winston.transports.File({ 
            filename: 'combined.log', // Log all messages to a file
            format: winston.format.json(),
        }),
    ],
});

// Export the logger
module.exports = logger;
