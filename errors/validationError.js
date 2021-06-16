module.exports = class ValidationError extends Error {
  constructor(message) {
    super(message);
 
    this.message = message;
    this.status = 400;
  }
}