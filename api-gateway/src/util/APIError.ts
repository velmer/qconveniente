import * as httpStatus from "http-status-codes";

/**
 * @extends Error
 */
class ExtendableError extends Error {

    public status: number;
    public isPublic: boolean;
    public isOperational: boolean;

    public constructor(message: string, status: any, isPublic: any) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.status = status;
        this.isPublic = isPublic;
        this.isOperational = true;
        Error.captureStackTrace(this);
    }
}

/**
 * Class representing an API error.
 * @extends ExtendableError
 */
export default class APIError extends ExtendableError {
    /**
     * Creates an API error.
     * @param {string} message - Error message.
     * @param {number} status - HTTP status code of error.
     * @param {boolean} isPublic - Whether the message should be visible to user or not.
     */
    public constructor(message: string, status: number = httpStatus.INTERNAL_SERVER_ERROR, isPublic: boolean = false) {
        super(message, status, isPublic);
    }
}