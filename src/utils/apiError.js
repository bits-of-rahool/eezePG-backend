class ApiError extends Error {
    constructor(statusCode, message = "Something went wrong", success = false) {
        super(message); // Pass the message to the Error constructor
        this.statusCode = statusCode;
        this.success = success;
    }
}

export { ApiError };


// res.status(error.statusCode ||400).json({
//     statusCode:error.statusCode,
//     message: error.message,
//     success:error.success 
// });

// throw new ApiError(400,"ooo")
// res.status(200).send(new ApiResponse(200,"ooooooo",data));
