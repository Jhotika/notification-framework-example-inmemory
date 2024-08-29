"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoUserNotificationMetadataRepository = void 0;
class MongoUserNotificationMetadataRepository {
    constructor(notificationCollection, userMetadataCollection) {
        this.notificationCollection = notificationCollection;
        this.userMetadataCollection = userMetadataCollection;
        this.genFetchLatestCreationTimeForUserX = async (userId) => {
            const notifications = await this.notificationCollection
                .find({
                ownerUid: userId,
            })
                .sort({ createTime: -1 })
                .limit(1)
                .toArray();
            return notifications.length > 0 ? notifications[0].createdAt : 0;
        };
        this.genUpdateWatermarkForUserX = async (userId) => {
            const lastFetchTime = Date.now();
            await this.userMetadataCollection.updateOne({ userId }, { $set: { lastFetchTime } }, { upsert: true });
        };
        this.genFetchUserMetadataX = async (userId) => {
            const userMetadata = await this.userMetadataCollection.findOne({
                userId: userId,
            });
            return {
                userId: userId,
                lastFetchTime: userMetadata?.lastFetchTime ?? 0,
            };
        };
        this.genFetchNumUnreadNotificationsX = async (userId) => {
            return await this.notificationCollection.countDocuments({
                ownerUid: userId,
                isRead: false,
            });
        };
    }
}
exports.MongoUserNotificationMetadataRepository = MongoUserNotificationMetadataRepository;
MongoUserNotificationMetadataRepository.fromCollections = (notificationCollection, userMetadataCollection) => {
    return new MongoUserNotificationMetadataRepository(notificationCollection, userMetadataCollection);
};
