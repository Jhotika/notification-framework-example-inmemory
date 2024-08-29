"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryNotificationRepository = exports.notificationsMap = void 0;
exports.notificationsMap = new Map();
class InMemoryNotificationRepository {
    constructor() {
        this.genCreateX = async (notification) => {
            if (exports.notificationsMap.has(notification.uid)) {
                throw new Error("Notification already exists");
            }
            exports.notificationsMap.set(notification.uid, notification);
        };
        this.genFetchX = async (notificationUid) => {
            return exports.notificationsMap.get(notificationUid) || null;
        };
        this.genMarkAllAsReadX = async () => {
            Array.from(exports.notificationsMap.values())
                // .filter((notification) => notification.ownerUuid === this.viewerId)
                .forEach((notification) => {
                notification.isRead = true;
            });
        };
        this.genMarkAsReadX = async (uid) => {
            const notification = exports.notificationsMap.get(uid);
            if (notification) {
                notification.isRead = true;
            }
        };
        this.genFetchAllRawForViewerX = async (userUid, genFetchAllRawForViewerX) => {
            return Array.from(exports.notificationsMap.values()).filter((notification) => notification.ownerUid === userUid &&
                notification.createdAt > (genFetchAllRawForViewerX ?? 0));
        };
        this.genDeleteX = async (uid) => {
            exports.notificationsMap.delete(uid);
        };
    }
}
exports.InMemoryNotificationRepository = InMemoryNotificationRepository;
