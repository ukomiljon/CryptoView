const logger = require('../utils/logger');

const requestLogger = (req, res, next) => {
    const { method, path } = req;
   
    logger.info(`Incoming Request: ${method} ${path}`, {
        timestamp: new Date().toISOString(),
    });

    // Proceed to the next middleware or route handler
    next();
};

module.exports = requestLogger;
