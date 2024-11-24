export const errorHandler = (error, _, res, next) => {
    const { status = 500, message = "Server error" } = error;
    res.status(status).json({
        status,
        message,
    })
}
