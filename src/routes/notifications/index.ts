import express, { Response } from "express";
import { YoService } from "../../services/yoService";
import { INotificationResponse } from "../../notifications/lib/models/abstractNotification";
import { NotificationServiceFetcher } from "../../utils/notificationFetcher";
import MockIds from "../../mock/mockIds";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const notificationService = NotificationServiceFetcher.fetchNotificationService();
    const notificationResponses: Array<INotificationResponse> = await notificationService.genFetchAllResponseForUserX(0);
    return res.status(200).json({ notifications: notificationResponses });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

router.post("/", async (req, res) => {
  try {
    await YoService.withNotificationService(MockIds.getInstance().viewerId).doSomethingAndSendNotification();
    res.json({ message: "Yo notification sent" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send notification" });
  }
});

router.post("/markAllAsRead", async (req, res) => {
  try {
    const notificationService = NotificationServiceFetcher.fetchNotificationService();
    await notificationService.genMarkAllAsReadX();
    return res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to mark notifications read" });
  }
});

router.post("/:uuid", async (req, res) => {
  try {
    await YoService.withNotificationService(MockIds.getInstance().ownerId).notificationService?.genMarkAsReadX(req.params.uuid);
    res.json({ message: "Notification marked as read" });
  } catch (error) {
    res.status(500).json({ error: "Failed to mark notification as read" });
  }
});

export default router;