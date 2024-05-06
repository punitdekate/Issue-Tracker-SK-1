export default class CustomErrorHandler extends Error {
    constructor(errorMessage, errorCode) {
        super(errorMessage);
        this.statusCode = errorCode;
        this.errorStack = this.stack
    }
}