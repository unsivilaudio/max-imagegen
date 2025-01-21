class AppError extends Error {
    constructor(public message: string, public statusCode: number) {
        super();
        this.message = message;
        this.statusCode = statusCode || 500;
    }
}

export default AppError;
