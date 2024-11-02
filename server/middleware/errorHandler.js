const logger = require('../logger/logger');

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

    // // Customize response based on error type
    // if (err.name === 'ValidationError') {
    //     return res.status(400).json({ message: err.message });
    // }

    // logger.error('Error occurred', {
    //     message: err.message,
    //     stack: err.stack,
    //     path: req.path,
    //     method: req.method,
    //     timestamp: new Date().toISOString(),
    // });

    // // Send a response to the client
    // res.status(500).json({ message: {
    //     message: err.message,
    //     stack: err.stack,
    //     path: req.path,
    //     method: req.method,
    //     timestamp: new Date().toISOString(),
    // }});
};

module.exports = errorHandler;
