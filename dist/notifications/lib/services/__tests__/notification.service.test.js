"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const logger_1 = require("../../logger");
const MockNotification_1 = require("../../__mocks__/MockNotification");
const inMemoryNotificationRepository_1 = require("../../repositories/inMemory/inMemoryNotificationRepository");
const inMemoryUserNotificationMetadataRepository_1 = require("../../repositories/inMemory/inMemoryUserNotificationMetadataRepository");
const notification_service_1 = require("../notification.service");
(0, globals_1.describe)("NotificationService", () => {
    const ownerId = "owner__0001"; // receiver / owner of the notification
    const viewerId = "viewer__0001"; // sender of the notification
    let notificationRepository;
    let notificationUserMetdataRepository;
    const notif = MockNotification_1.MockNotification.new(ownerId, viewerId);
    const originalConsoleError = console.error;
    beforeAll(() => {
        notificationRepository = new inMemoryNotificationRepository_1.InMemoryNotificationRepository();
        notificationUserMetdataRepository =
            new inMemoryUserNotificationMetadataRepository_1.InMemoryUserNotificationMetadataRepository();
        // Mock console.error to prevent error logs from appearing in the console
        console.error = jest.fn();
    });
    afterAll(() => {
        console.error = originalConsoleError;
    });
    let sendersNotificationService;
    let ownersNotificationService;
    (0, globals_1.it)("should create two notification service instances", async () => {
        sendersNotificationService = new notification_service_1.NotificationService(viewerId, notificationRepository, notificationUserMetdataRepository, [MockNotification_1.MockNotification], new logger_1.Logger());
        ownersNotificationService = new notification_service_1.NotificationService(ownerId, notificationRepository, notificationUserMetdataRepository, [MockNotification_1.MockNotification], new logger_1.Logger());
        (0, globals_1.expect)(sendersNotificationService).toBeDefined();
        (0, globals_1.expect)(ownersNotificationService).toBeDefined();
    });
    (0, globals_1.it)("should create a notification", async () => {
        await sendersNotificationService.genSave(notif);
        // Using repository to test the save method only
        // Test notification service fetch in a separate test
        const fetchedNotification = await notificationRepository.genFetchX(notif.uid);
        (0, globals_1.expect)(fetchedNotification).toEqual(notif);
    });
    (0, globals_1.it)("shouldn't mark a notification as read when user doesn't have permission", async () => {
        // Test for sender
        try {
            await sendersNotificationService.genMarkAsReadX(notif.uid);
            const fetchedNotification = await notificationRepository.genFetchX(notif.uid);
            (0, globals_1.expect)(fetchedNotification?.isRead).toBe(false);
        }
        catch (error) {
            (0, globals_1.expect)(error.message).toBeDefined();
        }
    });
    (0, globals_1.it)("should mark a notification as read when user has permission", async () => {
        // Test for owner
        await ownersNotificationService.genMarkAsReadX(notif.uid);
        const fetchedNotification = await notificationRepository.genFetchX(notif.uid);
        (0, globals_1.expect)(fetchedNotification?.isRead).toBe(true);
    });
    test("sender can't  delete a notification", async () => {
        const isDeleted = await sendersNotificationService.genDeleteNotificationX(notif.uid);
        (0, globals_1.expect)(isDeleted).toBe(false);
        const fetchedNotification = await notificationRepository.genFetchX(notif.uid);
        (0, globals_1.expect)(fetchedNotification).toEqual({
            ...notif,
            isRead: true,
        });
    });
    test("owner can delete a notification", async () => {
        const isDeleted = await ownersNotificationService.genDeleteNotificationX(notif.uid);
        (0, globals_1.expect)(isDeleted).toBe(true);
        const fetchedNotification = await notificationRepository.genFetchX(notif.uid);
        (0, globals_1.expect)(fetchedNotification).toBeNull();
    });
    test("force delete a notification", async () => {
        const notif2 = MockNotification_1.MockNotification.new(ownerId, viewerId);
        await sendersNotificationService.genSave(notif2);
        const isDeleted = await sendersNotificationService.genDeleteNotificationBypassingPermCheck(notif2.uid);
        (0, globals_1.expect)(isDeleted).toBe(true);
        const fetchedNotif2 = await notificationRepository.genFetchX(notif2.uid);
        (0, globals_1.expect)(fetchedNotif2).toBeNull();
    });
    test("fetch all notifications for a user", async () => {
        const notif1 = MockNotification_1.MockNotification.new(ownerId, viewerId, "test 1");
        const notif2 = MockNotification_1.MockNotification.new(ownerId, viewerId, "test 2");
        await Promise.all([
            sendersNotificationService.genSave(notif1),
            sendersNotificationService.genSave(notif2),
        ]);
        const notifications = await ownersNotificationService.genFetchAllResponseForUserX(null);
        (0, globals_1.expect)(notifications.length).toBe(2);
        (0, globals_1.expect)(notifications).toEqual([
            {
                notification: notif1.toINotification(),
                customResponseField: "custom-response",
            },
            {
                notification: notif2.toINotification(),
                customResponseField: "custom-response",
            },
        ]);
    });
});
