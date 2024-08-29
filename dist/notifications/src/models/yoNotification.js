"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YoNotification = void 0;
const abstractNotification_1 = require("../../lib/models/abstractNotification");
const uuid_1 = require("uuid");
const notificationTypes_1 = require("../notificationTypes");
class YoNotification extends abstractNotification_1.AbstractNotification {
    constructor(data) {
        super(data);
        this.type = "YoNotification";
        this.genResponse = async () => {
            return {
                notification: this,
                senderUid: this.senderUid,
                message: this.message,
            };
        };
    }
    toINotification() {
        return {
            uid: this.uid,
            type: this.type,
            payload: this.payload,
            ownerUid: this.ownerUid,
            senderUid: this.senderUid,
            isRead: this.isRead,
            createdAt: this.createdAt,
        };
    }
}
exports.YoNotification = YoNotification;
YoNotification.New = (ownerUid, senderUid, message, payload = {}) => {
    return new YoNotification({
        uid: (0, uuid_1.v4)(),
        type: notificationTypes_1.NotificationType.Yo,
        payload,
        ownerUid,
        senderUid,
        message,
        isRead: false,
        createdAt: Date.now(),
    });
};
