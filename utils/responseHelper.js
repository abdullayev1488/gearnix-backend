export const sendSuccess = (res, { data = null, message = "Success", statusCode = 200 } = {}) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data
    });
};

export const sendError = (res, { message = "Internal server error", statusCode = 500, field = null } = {}) => {
    const response = {
        success: false,
        message,
    };
    if (field) response.field = field;
    return res.status(statusCode).json(response);
};
