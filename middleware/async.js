//not using asyncWrapper in the current code, can be updated as an alternative
// Wrapper function to handle asynchronous route handlers
const asyncWrapper = (fn) => {
    return async (req, res, next) => {
        try {
            // Execute the passed-in asynchronous function
            await fn(req, res, next);
        } catch (error) {
            // Pass any errors to the next middleware/error handler
            next(error);
        }
    }
}

module.exports = asyncWrapper;
