class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
        this.statusCode = 400;
    }
}

class UnauthorizedError extends Error {
    constructor(message = 'Unauthorized access') {
        super(message);
        this.name = 'UnauthorizedError';
        this.statusCode = 401;
    }
}

class ServiceError extends Error {
    constructor(message = 'Service error') {
        super(message);
        this.name = 'ServiceError';
        this.statusCode = 500;
    }
}

module.exports = {
    ValidationError,
    UnauthorizedError,
    ServiceError,
};
