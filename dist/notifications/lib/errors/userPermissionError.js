"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPermissionError = void 0;
class UserPermissionError extends Error {
    constructor(message) {
        super(message);
        this.name = "UserPermissionError";
    }
}
exports.UserPermissionError = UserPermissionError;
