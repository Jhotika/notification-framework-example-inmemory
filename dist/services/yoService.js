"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YoService = void 0;
const yoNotification_service_1 = require("../notifications/src/services/yoNotification.service");
const notificationClient_1 = require("../clients/notificationClient");
const mockIds_1 = __importDefault(require("../mock/mockIds"));
class YoService {
    constructor(viewerUid, notificationService) {
        this.viewerUid = viewerUid;
        this.notificationService = notificationService;
    }
    async doSomethingAndSendNotification() {
        console.log("YoService.doSomethingAndSendNotification");
        try {
            if (!this.notificationService) {
                console.error("Notification service not initialized in TripsService");
                return true;
            }
            else {
                const notifService = yoNotification_service_1.YoNotificationService.fromNotificationService(this.notificationService);
                await notifService.genCreateNotification(mockIds_1.default.getInstance().ownerId);
            }
        }
        catch (e) {
            console.error(`Failed to create notification for user ${this.viewerUid}`);
        }
        return true;
    }
}
exports.YoService = YoService;
YoService.withNotificationService = (viewerUid) => {
    console.log("YoService.withNotificationService");
    const breaNotifFramework = notificationClient_1.ExampleNotificationFramework.getInstanceX();
    const notifService = breaNotifFramework.getNotificationServiceX(viewerUid);
    console.log("Notification service created: ", notifService);
    return new YoService(viewerUid, notifService);
};
;
