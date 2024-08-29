"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const logger_1 = require("../logger");
const notificaionPerm_1 = require("../notificaionPerm");
const userNotificationMetadata_service_1 = require("./userNotificationMetadata.service");
const userPermissionError_1 = require("../errors/userPermissionError");
const notificationFactory_1 = require("../models/notificationFactory");
class NotificationService {
    constructor(viewerId, notificationRepository, userNotificationMetadataRepository, notificationClasses, logger = new logger_1.Logger()) {
        this.viewerId = viewerId;
        this.notificationRepository = notificationRepository;
        this.userNotificationMetadataRepository = userNotificationMetadataRepository;
        this.notificationClasses = notificationClasses;
        this.logger = logger;
        this.genFetchAllForUserX = async (lastFetchTimeInMs) => {
            const rawNotifications = await this.notificationRepository.genFetchAllRawForViewerX(this.viewerId, lastFetchTimeInMs);
            // intentinally running async
            await this.userNotificationMetadataService.genUpdateWatermarkForUserX();
            return (await Promise.all(rawNotifications
                .map((rawNotification) => {
                try {
                    return (0, notificationFactory_1.notificationFactoryX)(rawNotification, this.notificationClasses);
                }
                catch (error) {
                    this.logger.error(`Error creating notification instance: ${error.message}`);
                    return null;
                }
            })
                .filter((notif) => notif != null))).filter((notif) => notif != null);
        };
        this.genFetchAllResponseForUserX = async (lastFetchTimeInMs) => {
            const notifications = await this.genFetchAllForUserX(lastFetchTimeInMs);
            return (await Promise.all(notifications.map((notification) => notification ? notification.genResponse() : null))).filter((notif) => notif != null);
        };
        this.genMarkAllAsReadX = async () => {
            try {
                await this.notificationRepository.genMarkAllAsReadX(this.viewerId);
            }
            catch (error) {
                this.logger.error(`Error marking all notifications as read: ${error.message}`);
                throw new Error("Error marking all notifications as read. Please try again later.");
            }
        };
        this.genMarkAsReadX = async (uuid) => {
            let notif;
            try {
                notif = await this.genFetchNotificationX(uuid);
                if (!notif) {
                    throw new Error(`Notification not found: ${uuid}`);
                }
            }
            catch (error) {
                this.logger.error(`Error fetching notification for user ${this.viewerId}: ${error.message}`);
                throw new Error(`Error fetching notification for user ${this.viewerId}: ${error.message}`);
            }
            const notifPerm = notificaionPerm_1.NotificationPerm.fromNotification(this.viewerId, notif);
            if (!notifPerm.viewerIsOwner) {
                throw new userPermissionError_1.UserPermissionError("User doesn't have permission to mark this notification as read");
            }
            await this.notificationRepository.genMarkAsReadX(uuid);
        };
        this.genSave = async (notification) => {
            try {
                await this.notificationRepository.genCreateX(notification);
                return true;
            }
            catch (error) {
                this.logger.error(`Error saving notification: ${error.message}`);
                return false;
            }
        };
        this.genFetchNotificationX = async (notificationUid) => {
            try {
                const maybeNotification__PRIVACY_UNSAFE = await this.notificationRepository.genFetchX(notificationUid);
                if (!maybeNotification__PRIVACY_UNSAFE) {
                    return null;
                }
                const perm = notificaionPerm_1.NotificationPerm.fromNotification(this.viewerId, maybeNotification__PRIVACY_UNSAFE);
                if (!perm.canView) {
                    throw new userPermissionError_1.UserPermissionError("User ${this.viewerId} doesn't have permission to view this notification: ${notificationUid}");
                }
                const maybeNotification = maybeNotification__PRIVACY_UNSAFE;
                try {
                    return (0, notificationFactory_1.notificationFactoryX)(maybeNotification, this.notificationClasses);
                }
                catch (error) {
                    this.logger.error(`Error creating notification instance: ${error.message}`);
                    return null;
                }
            }
            catch (error) {
                this.logger.error(`Error fetching notification for user ${this.viewerId}: ${error.message}`);
                return null;
            }
        };
        this.genFetchNotificationResponseX = async (notificationUid) => {
            const notification = await this.genFetchNotificationX(notificationUid);
            if (!notification) {
                return null;
            }
            return await notification.genResponse();
        };
        this.genDeleteNotificationX = async (notificationUid) => {
            const existingNotif = await this.genFetchNotificationX(notificationUid);
            if (!existingNotif) {
                return false;
            }
            const notifPerm = notificaionPerm_1.NotificationPerm.fromNotification(this.viewerId, existingNotif);
            // Only the owner of the notification can delete it
            // TODO: Add support for super admins
            if (!notifPerm.viewerIsOwner) {
                throw new userPermissionError_1.UserPermissionError("User doesn't have permission to delete this notification");
            }
            try {
                await this.notificationRepository.genDeleteX(notificationUid);
                return true;
            }
            catch (error) {
                this.logger.error(`Error deleting notification for user ${this.viewerId}: ${error.message}`);
                return false;
            }
        };
        this.genDeleteNotificationBypassingPermCheck = async (notificationUid) => {
            try {
                await this.notificationRepository.genDeleteX(notificationUid);
                return true;
            }
            catch (error) {
                this.logger.error(`Error deleting notification for user ${this.viewerId}: ${error.message}`);
                return false;
            }
        };
        this.userNotificationMetadataService = new userNotificationMetadata_service_1.UserNotificationMetadataService(viewerId, this.userNotificationMetadataRepository, this.logger);
    }
}
exports.NotificationService = NotificationService;
