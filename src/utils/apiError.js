class ApiError extends Error {
    constructor(statusCode, message = "Something went wrong", success = false) {
        super(message); // Pass the message to the Error constructor
        this.statusCode = statusCode;
        this.success = success;
    }
}

export { ApiError };


// res.status(error.statusCode).json({
//     statusCode:error.statusCode,
//     message: error.message,
//     success:error.success 
// });

// throw new ApiError(400,"ooo")
// new ApiResponse(200,"ooo",data)