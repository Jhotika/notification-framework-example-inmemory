"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inMemoryUserNotificationMetadataRepository_1 = require("../inMemoryUserNotificationMetadataRepository");
const globals_1 = require("@jest/globals");
const inMemoryNotificationRepository_1 = require("../inMemoryNotificationRepository");
const MockNotification_1 = require("../../../__mocks__/MockNotification");
(0, globals_1.describe)("InMemory", () => {
    const viewerId = "viewer__0001";
    const repository = new inMemoryUserNotificationMetadataRepository_1.InMemoryUserNotificationMetadataRepository();
    const notifRepository = new inMemoryNotificationRepository_1.InMemoryNotificationRepository();
    const senderUuid = "sender__0001";
    const notification = MockNotification_1.MockNotification.new(viewerId, senderUuid, "customValue");
    notifRepository.genCreateX(notification);
    (0, globals_1.it)("should fetch the latest notification creation time for user", async () => {
        const newerNotif = MockNotification_1.MockNotification.new(viewerId, senderUuid, "random customValue");
        notifRepository.genCreateX(newerNotif);
        const someoneElsesNotif = MockNotification_1.MockNotification.new("someone_elses_id", senderUuid, "foo");
        const someoneElsesRepo = new inMemoryNotificationRepository_1.InMemoryNotificationRepository();
        someoneElsesRepo.genCreateX(someoneElsesNotif);
        await repository.genFetchLatestCreationTimeForUserX(viewerId);
        const fetchedNotification = await repository.genFetchLatestCreationTimeForUserX(viewerId);
        (0, globals_1.expect)(fetchedNotification).toEqual(newerNotif.createdAt);
    });
    (0, globals_1.it)("should update the watermark for user", async () => {
        const timeNow = Date.now();
        await repository.genUpdateWatermarkForUserX(viewerId);
        const fetchedMetadata = await repository.genFetchUserMetadataX(viewerId);
        (0, globals_1.expect)(fetchedMetadata.lastFetchTime).toBeGreaterThanOrEqual(timeNow);
    });
    (0, globals_1.it)("should fetch the user metadata", async () => {
        const fetchedMetadata = await repository.genFetchUserMetadataX(viewerId);
        (0, globals_1.expect)(fetchedMetadata.userId).toEqual(viewerId);
        // Check that the metadata is updated with watermark update
        await repository.genUpdateWatermarkForUserX(viewerId);
        const fetchedMetadata2 = await repository.genFetchUserMetadataX(viewerId);
        (0, globals_1.expect)(fetchedMetadata2.lastFetchTime).toBeGreaterThanOrEqual(fetchedMetadata.lastFetchTime);
    });
    (0, globals_1.it)("should fetch number of unread notifications", async () => {
        const fetchedNum = await repository.genFetchNumUnreadNotificationsX(viewerId);
        (0, globals_1.expect)(fetchedNum).toEqual(2); // notification + newerNotif
        await notifRepository.genMarkAsReadX(notification.uid);
        const fetchedNum2 = await repository.genFetchNumUnreadNotificationsX(viewerId);
        (0, globals_1.expect)(fetchedNum2).toEqual(1); // only newerNotif
    });
});
