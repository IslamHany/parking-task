const {validationResult} = require('express-validator');
const ValidationError = require('../errors/validationError');

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
        throw new ValidationError(errors.array());
    next();
};

module.exports = validateRequest;