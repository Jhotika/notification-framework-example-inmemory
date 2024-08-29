"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExampleNotificationFramework = void 0;
const logger_1 = require("../notifications/lib/logger");
const notificationFramework_builder_1 = require("../notifications/lib/notificationFramework.builder");
const yoNotification_1 = require("../notifications/src/models/yoNotification");
class ExampleNotificationFramework {
}
exports.ExampleNotificationFramework = ExampleNotificationFramework;
ExampleNotificationFramework.getInstanceX = () => {
    if (!ExampleNotificationFramework.instance) {
        const framework = new notificationFramework_builder_1.NotificationFrameworkBuilder()
            .withLogger(new logger_1.Logger())
            .withInMemoryDbConfig({})
            .withConcreteNotificationClasses([yoNotification_1.YoNotification]);
        ExampleNotificationFramework.instance = framework.buildX();
    }
    return ExampleNotificationFramework.instance;
};
