"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const logger_1 = require("../../logger");
const MockNotification_1 = require("../../__mocks__/MockNotification");
const inMemoryNotificationRepository_1 = require("../../repositories/inMemory/inMemoryNotificationRepository");
const inMemoryUserNotificationMetadataRepository_1 = require("../../repositories/inMemory/inMemoryUserNotificationMetadataRepository");
const notification_service_1 = require("../notification.service");
const userNotificationMetadata_service_1 = require("../userNotificationMetadata.service");
(0, globals_1.describe)("UserNotificationMetadataService", () => {
    const ownerId = "owner__0001"; // receiver / owner of the notification
    const viewerId = "viewer__0001"; // sender of the notification
    let notificationRepository;
    let notificationUserMetdataRepository;
    let sendersNotificationService;
    let ownersNotificationService;
    const originalConsoleError = console.error;
    beforeAll(() => {
        notificationRepository = new inMemoryNotificationRepository_1.InMemoryNotificationRepository();
        notificationUserMetdataRepository =
            new inMemoryUserNotificationMetadataRepository_1.InMemoryUserNotificationMetadataRepository();
        sendersNotificationService = new notification_service_1.NotificationService(viewerId, notificationRepository, notificationUserMetdataRepository, [MockNotification_1.MockNotification], // enabled concrete notification classes
        new logger_1.Logger());
        ownersNotificationService = new notification_service_1.NotificationService(ownerId, notificationRepository, notificationUserMetdataRepository, [MockNotification_1.MockNotification], // enabled concrete notification classes
        new logger_1.Logger());
        // Mock console.error to prevent error logs from appearing in the console
        console.error = jest.fn();
    });
    afterAll(() => {
        console.error = originalConsoleError;
    });
    let ownersUserNotificationMetadataService;
    (0, globals_1.it)("should create an instance of userNotificationMetadata service instance", async () => {
        ownersUserNotificationMetadataService = new userNotificationMetadata_service_1.UserNotificationMetadataService(ownerId, notificationUserMetdataRepository, new logger_1.Logger());
        (0, globals_1.expect)(ownersUserNotificationMetadataService).toBeDefined();
    });
    (0, globals_1.it)("should fetch all notifications for user", async () => {
        const notifications = await ownersNotificationService.genFetchAllResponseForUserX(null);
        (0, globals_1.expect)(notifications).toEqual([]);
    });
    (0, globals_1.it)("should have new notification", async () => {
        // create a new notification
        const notif = MockNotification_1.MockNotification.new(ownerId, viewerId);
        await sendersNotificationService.genSave(notif);
        const hasNewNotif = await ownersUserNotificationMetadataService.genIfUserHasNewNotificationX();
        (0, globals_1.expect)(hasNewNotif).toBe(true);
    });
    (0, globals_1.it)("should update watermark for user", async () => {
        const curTime = Date.now();
        await ownersUserNotificationMetadataService.genUpdateWatermarkForUserX();
        const userMetadata = await notificationUserMetdataRepository.genFetchUserMetadataX(ownerId);
        (0, globals_1.expect)(userMetadata.lastFetchTime).toBeGreaterThanOrEqual(curTime);
    });
    (0, globals_1.it)("should have the correct latest creation time for user", async () => {
        const notif2 = MockNotification_1.MockNotification.new(ownerId, viewerId);
        await sendersNotificationService.genSave(notif2);
        const latestCreationTime = await notificationUserMetdataRepository.genFetchLatestCreationTimeForUserX(ownerId);
        (0, globals_1.expect)(latestCreationTime).toEqual(notif2.createdAt);
    });
});
