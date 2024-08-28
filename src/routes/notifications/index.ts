import express, { Response } from "express";
import { YoService } from "../../services/yoService";
import { INotificationResponse } from "../../notifications/lib/models/abstractNotification";
import { NotificationServiceFetcher } from "../../utils/notificationFetcher";
import MockIds from "../../mock/mockIds";
const router = express.Router();


router.get("/", async (req, res) => {
  const notificationService =
    NotificationServiceFetcher.fromRequest(req).fetchNotificationService();
  const notificationResponses: Array<INotificationResponse> =
    await notificationService.genFetchAllResponseForUserX();
    console.log("Received a GET request: ", notificationResponses);
  return res.status(200).json({ notifications: notificationResponses });
});

router.post("/", (req, res) => {
  console.log("Received a POST request");
  YoService.withNotificationService(MockIds.getInstance().viewerId).doSomethingAndSendNotification();
  res.json({ message: "Yo notification sent" });
});

export default router;