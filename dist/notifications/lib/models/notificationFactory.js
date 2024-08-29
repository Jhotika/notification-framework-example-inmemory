"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationFactoryX = void 0;
const notificationFactoryX = (json, classes) => {
    const className = json.type;
    const matchingClass = classes.find((cls) => cls.name === className);
    if (!matchingClass) {
        throw new Error(`notificationFactory: class not found for ${className}`);
    }
    return new matchingClass(json);
};
exports.notificationFactoryX = notificationFactoryX;
