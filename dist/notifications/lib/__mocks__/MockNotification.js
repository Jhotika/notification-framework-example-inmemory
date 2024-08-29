"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockNotification = void 0;
const uuid_1 = require("uuid");
const abstractNotification_1 = require("../models/abstractNotification");
class MockNotification extends abstractNotification_1.AbstractNotification {
    constructor(data) {
        super(data);
        this.genResponse = async () => {
            return {
                notification: this.toINotification(),
                customResponseField: "custom-response",
            };
        };
    }
    static new(ownerUid, senderUid, customField = "foo") {
        return new MockNotification({
            uid: (0, uuid_1.v4)(),
            type: MockNotification.__type,
            ownerUid,
            senderUid,
            isRead: false,
            createdAt: Date.now(),
            payload: {},
            customField,
        });
    }
    toINotification() {
        return {
            uid: this.uid,
            type: this.type,
            ownerUid: this.ownerUid,
            senderUid: this.senderUid,
            isRead: this.isRead,
            payload: this.payload,
            createdAt: this.createdAt,
            customField: this.customField,
        };
    }
}
exports.MockNotification = MockNotification;
MockNotification.__type = "MockNotification";
