const errorHandler = (error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || "something went wrong";
    
    res.status(status);
    res.json({error: message});
};

module.exports = errorHandler;