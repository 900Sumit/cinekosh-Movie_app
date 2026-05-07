/**
 * Async Handler Wrapper
 *
 * Wraps async route handlers to catch rejected promises
 * and forward errors to the centralized error handler.
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
