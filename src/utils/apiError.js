class ApiError extends Error {
    constructor(statusCode, message = "Something went wrong", success = false) {
        super(message); // Pass the message to the Error constructor
        this.statusCode = statusCode;
        this.success = success;
    }
}

export { ApiError };
