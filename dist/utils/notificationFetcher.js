"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationServiceFetcher = void 0;
const notificationClient_1 = require("../clients/notificationClient");
const mockIds_1 = __importDefault(require("../mock/mockIds"));
class NotificationServiceFetcher {
    constructor(userId) {
        this.userId = userId;
    }
    // static fromRequest(req: Request): NotificationServiceFetcher {
    //   // hardcoding the userId for demo purposes
    //   // in a real application, you would get the userId from the request or middleware
    //   const userId = MockIds.getInstance().ownerId;
    //   console.log("NotificationServiceFetcher: userId", userId);
    //   if (!userId) {
    //     throw new Error("userId is required");
    //   }
    //   return new NotificationServiceFetcher(userId);
    // }
    static fromUserId(userId) {
        return new NotificationServiceFetcher(userId);
    }
    static fetchNotificationService() {
        const notifFramework = notificationClient_1.ExampleNotificationFramework.getInstanceX();
        return notifFramework.getNotificationServiceX(mockIds_1.default.getInstance().ownerId);
    }
    fetchUserNotificationMetadataService() {
        const notifFramework = notificationClient_1.ExampleNotificationFramework.getInstanceX();
        return notifFramework.getUserNotificationMetadataServiceX(this.userId);
    }
}
exports.NotificationServiceFetcher = NotificationServiceFetcher;
