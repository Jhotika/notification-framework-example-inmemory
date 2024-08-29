"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YoNotificationService = void 0;
const yoNotification_1 = require("../models/yoNotification");
const notification_service_1 = require("../../lib/services/notification.service");
class YoNotificationService extends notification_service_1.NotificationService {
    constructor(parent) {
        super(parent.viewerId, parent.notificationRepository, parent.userNotificationMetadataRepository, parent.notificationClasses, parent.logger);
    }
    async genCreateNotification(ownerId // the user that will receive the notification
    ) {
        console.log("YoNotificationService.genCreateNotification: ownerId", ownerId, "viewerId", this.viewerId);
        const notification = yoNotification_1.YoNotification.New(ownerId, this.viewerId, "Yo, what's up?");
        console.log("Notification created: ", notification);
        try {
            await this.genSave(notification);
            console.log("Notification saved in memory");
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.YoNotificationService = YoNotificationService;
YoNotificationService.fromNotificationService = (notificationService) => {
    return new YoNotificationService(notificationService);
};
