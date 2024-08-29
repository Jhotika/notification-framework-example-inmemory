"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryUserNotificationMetadataRepository = void 0;
const inMemoryNotificationRepository_1 = require("./inMemoryNotificationRepository");
let userNotificationMetadataMap = new Map();
class InMemoryUserNotificationMetadataRepository {
    constructor() {
        this.genFetchLatestCreationTimeForUserX = async (userId) => {
            const notifications = Array.from(inMemoryNotificationRepository_1.notificationsMap.values()).filter((notification) => notification.ownerUid === userId);
            const sortedNotifications = notifications.sort((a, b) => b.createdAt - a.createdAt);
            return sortedNotifications.length > 0
                ? sortedNotifications[0].createdAt
                : 0;
        };
        this.genUpdateWatermarkForUserX = async (userId) => {
            userNotificationMetadataMap.set(userId, {
                userId,
                lastFetchTime: Date.now(),
            });
        };
        this.genFetchUserMetadataX = async (userId) => {
            const userMetadata = userNotificationMetadataMap.get(userId);
            if (!userMetadata) {
                throw new Error("User metadata not found");
            }
            return userMetadata;
        };
        this.genFetchNumUnreadNotificationsX = async (userId) => {
            return Array.from(inMemoryNotificationRepository_1.notificationsMap.values()).filter((notification) => notification.ownerUid === userId && !notification.isRead).length;
        };
    }
}
exports.InMemoryUserNotificationMetadataRepository = InMemoryUserNotificationMetadataRepository;
