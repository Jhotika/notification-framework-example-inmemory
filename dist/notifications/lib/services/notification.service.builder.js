"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationServiceBuilder = void 0;
const logger_1 = require("../logger");
const notification_service_1 = require("./notification.service");
class NotificationServiceBuilder {
    constructor() { }
    withViewerId(viewerId) {
        this.viewerId = viewerId;
        return this;
    }
    withNotificationRepository(notificationRepository) {
        this.notificationRepository = notificationRepository;
        return this;
    }
    withUserNotificationMetadataRepository(userNotificationMetadataRepository) {
        this.userNotificationMetadataRepository =
            userNotificationMetadataRepository;
        return this;
    }
    withLogger(logger) {
        this.logger = logger;
        return this;
    }
    withNotificationClasses(notificationClasses) {
        this.notificationClasses = notificationClasses;
        return this;
    }
    build() {
        return new notification_service_1.NotificationService(this.viewerId, this.notificationRepository, this.userNotificationMetadataRepository, this.notificationClasses, this.logger ?? new logger_1.Logger());
    }
}
exports.NotificationServiceBuilder = NotificationServiceBuilder;
