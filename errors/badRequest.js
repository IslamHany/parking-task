module.exports = class BadRequestError extends Error {
  constructor(message, status) {
    super(message);
 
    this.message = message;
    this.status = status || 400;
  }
}