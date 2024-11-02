const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
    let statusCode = 500; // Default to 500 for server errors
    let message = 'An internal server error occurred: ' + err.message;

    // Determine the status code and message based on error type
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = 'Invalid input data:' + err.message;
    } else if (err.message === 'Unauthorized') {
        statusCode = 401;
        message = 'Unauthorized access';
    } else if (err.statusCode) {
        statusCode = err.statusCode;
        message = err.message;
    }

    // Send structured JSON error response
    res.status(statusCode).json({
        error: message,
    });
};

module.exports = errorHandler;
