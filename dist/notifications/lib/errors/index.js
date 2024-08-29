"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Errors = void 0;
const userPermissionError_1 = require("./userPermissionError");
// DatabaseNotSupportedError is not exported intentionally; Shouldn't be used outside of library
exports.Errors = { UserPermissionError: userPermissionError_1.UserPermissionError };
