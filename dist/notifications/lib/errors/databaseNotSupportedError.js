"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseNotSupportedError = void 0;
class DatabaseNotSupportedError extends Error {
    constructor(message) {
        super(message);
        this.name = "DatabaseNotSupportedError";
    }
}
exports.DatabaseNotSupportedError = DatabaseNotSupportedError;
