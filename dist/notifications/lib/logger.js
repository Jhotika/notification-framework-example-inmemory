"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
class Logger {
    constructor() {
        this.log = (message, ...optionalParams) => {
            console.log(message, optionalParams);
        };
        this.info = (message, ...optionalParams) => {
            console.info(message, optionalParams);
        };
    }
    warn(message, ...optionalParams) {
        console.warn(message, optionalParams);
    }
    error(message, ...optionalParams) {
        console.error(message, optionalParams);
    }
}
exports.Logger = Logger;
