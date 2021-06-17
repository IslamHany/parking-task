module.exports = class NotError extends Error {
  constructor(message) {
    super("Route not found");
 
    this.message = message || "Route not found";
    this.status = 404;
  }
}