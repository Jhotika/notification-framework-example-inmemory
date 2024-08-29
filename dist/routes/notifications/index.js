"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const yoService_1 = require("../../services/yoService");
const notificationFetcher_1 = require("../../utils/notificationFetcher");
const mockIds_1 = __importDefault(require("../../mock/mockIds"));
const router = express_1.default.Router();
router.get("/", async (req, res) => {
    try {
        const notificationService = notificationFetcher_1.NotificationServiceFetcher.fetchNotificationService();
        const notificationResponses = await notificationService.genFetchAllResponseForUserX(0);
        return res.status(200).json({ notifications: notificationResponses });
    }
    catch (error) {
        return res.status(500).json({ error: "Failed to fetch notifications" });
    }
});
router.post("/", async (req, res) => {
    try {
        const result = await yoService_1.YoService.withNotificationService(mockIds_1.default.getInstance().viewerId).doSomethingAndSendNotification();
        res.json({ message: "Yo notification sent" });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to send notification" });
    }
});
router.post("/markAllAsRead", async (req, res) => {
    console.log("Received a POST request to mark all notifications");
    try {
        const notificationService = notificationFetcher_1.NotificationServiceFetcher.fetchNotificationService();
        await notificationService.genMarkAllAsReadX();
        const notificationResponses = await notificationService.genFetchAllResponseForUserX(0);
        console.log("After marking all as read, notifications are:", notificationResponses);
        return res.status(200).json({ success: true });
    }
    catch (error) {
        console.error("Error marking notifications read:", error);
        res.status(500).json({ error: "Failed to mark notifications read" });
    }
});
exports.default = router;
