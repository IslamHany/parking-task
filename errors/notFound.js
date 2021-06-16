module.exports = class NotError extends Error {
  constructor() {
    super("Route not found");
 
    this.message = "Route not found";
    this.status = 404;
  }
}