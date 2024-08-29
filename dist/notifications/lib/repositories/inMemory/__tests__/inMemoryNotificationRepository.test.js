"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inMemoryNotificationRepository_1 = require("../inMemoryNotificationRepository");
const globals_1 = require("@jest/globals");
const MockNotification_1 = require("../../../__mocks__/MockNotification");
(0, globals_1.describe)("InMemoryNotificationRepository", () => {
    const viewerId = "viewer__0001";
    let notificationRepository;
    const senderUuid = "sender__0001";
    const notification = MockNotification_1.MockNotification.new(viewerId, senderUuid, "customValue");
    beforeEach(() => {
        notificationRepository = new inMemoryNotificationRepository_1.InMemoryNotificationRepository();
    });
    (0, globals_1.it)("should create a notification", async () => {
        await notificationRepository.genCreateX(notification);
        const fetchedNotification = await notificationRepository.genFetchX(notification.uid);
        (0, globals_1.expect)(fetchedNotification).toEqual(notification);
    });
    (0, globals_1.it)("should fetch a notification", async () => {
        const fetchedNotification = await notificationRepository.genFetchX(notification.uid);
        (0, globals_1.expect)(fetchedNotification).toEqual(notification);
    });
    (0, globals_1.it)("should mark a notification as read", async () => {
        await notificationRepository.genMarkAsReadX(notification.uid);
        const fetchedNotification = await notificationRepository.genFetchX(notification.uid);
        (0, globals_1.expect)(fetchedNotification?.isRead).toBe(true);
    });
    (0, globals_1.it)("should fetch all notifications for a user", async () => {
        const notification2 = MockNotification_1.MockNotification.new(viewerId, senderUuid, "random customValue");
        const notificationAnotherUser = MockNotification_1.MockNotification.new("random_user_id", senderUuid, "some other value");
        const anotherNotificationRepository = new inMemoryNotificationRepository_1.InMemoryNotificationRepository();
        await anotherNotificationRepository.genCreateX(notificationAnotherUser);
        await notificationRepository.genCreateX(notification2);
        const notifications = await notificationRepository.genFetchAllRawForViewerX(viewerId, null);
        (0, globals_1.expect)(notifications).toEqual([notification, notification2]);
    });
    (0, globals_1.it)("should mark all notifications as read", async () => {
        const notification3 = MockNotification_1.MockNotification.new(viewerId, senderUuid, "bar");
        await notificationRepository.genCreateX(notification3);
        await notificationRepository.genMarkAllAsReadX();
        const allNotifs = await notificationRepository.genFetchAllRawForViewerX(viewerId, null);
        (0, globals_1.expect)(allNotifs.every((n) => n.isRead)).toBe(true);
    });
});
