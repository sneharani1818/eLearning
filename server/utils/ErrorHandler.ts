class ErrorHandler extends Error {
  statusCode: Number;
  constructor(message: any, statusCode: Number) {
    super(message);
    this.statusCode = statusCode;

    // Error.captureStackTrace(this);
    // Fallback for environments without captureStackTrace
    this.stack = new Error().stack;
  }
}
export default ErrorHandler;
