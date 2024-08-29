"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationPerm = void 0;
class NotificationPerm {
    constructor(viewerUid, notification) {
        this.viewerUid = viewerUid;
        this.notification = notification;
    }
    get viewerIsOwner() {
        return this.notification.ownerUid === this.viewerUid;
    }
    get canView() {
        return this.viewerIsOwner;
    }
}
exports.NotificationPerm = NotificationPerm;
NotificationPerm.fromNotification = (viewerUid, notification) => {
    return new NotificationPerm(viewerUid, notification);
};
