const logger = require('../logger/logger');

const requestLogger = (req, res, next) => {
    const { method, path } = req;

    // Log the request details
    logger.info(`Incoming Request: ${method} ${path}`, {
        timestamp: new Date().toISOString(),
    });

    // Proceed to the next middleware or route handler
    next();
};

module.exports = requestLogger;
