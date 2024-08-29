"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoNotificationRepository = void 0;
const logger_1 = require("../../logger");
class MongoNotificationRepository {
    constructor(collection, logger = new logger_1.Logger()) {
        this.collection = collection;
        this.logger = logger;
        this.genCreateX = async (notification) => {
            await this.collection.insertOne(notification);
        };
        this.genFetchX = async (notificationUid) => {
            return await this.collection.findOne({
                uid: notificationUid,
            });
        };
        this.genMarkAllAsReadX = async (ownerUid) => {
            await this.collection.updateMany({ ownerUid }, { $set: { isRead: true } });
        };
        this.genMarkAsReadX = async (uid) => {
            await this.collection.updateOne({ uid }, { $set: { isRead: true } });
        };
        this.genFetchAllRawForViewerX = async (viewerUid, lastFetchTimeInMs) => {
            return await this.collection
                .find({
                ownerUid: viewerUid,
                createdAt: { $gt: lastFetchTimeInMs ?? 0 },
            })
                .toArray();
        };
        this.genDeleteX = async (uid) => {
            await this.collection.deleteOne({ uuid: uid });
        };
    }
}
exports.MongoNotificationRepository = MongoNotificationRepository;
MongoNotificationRepository.fromCollectionX = (collection) => {
    if (!MongoNotificationRepository.instance) {
        MongoNotificationRepository.instance = new MongoNotificationRepository(collection);
    }
    else if (MongoNotificationRepository?.instance?.collection &&
        MongoNotificationRepository.instance.collection !== collection) {
        throw new Error("MongoNotificationRepository.fromCollection called with different collection" +
            collection +
            " " +
            MongoNotificationRepository.instance?.collection);
    }
    return MongoNotificationRepository.instance;
};
