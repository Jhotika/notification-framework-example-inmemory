import express, { Response } from "express";
import { YoService } from "../../services/yoService";
const router = express.Router();

router.post("/", (req, res) => {
  const message = req.body.message;
  // YoService.withNotificationService("123");
  YoService.withNotificationService("123");
  res.json({ message: "Yo notification sent" });
});

export default router;