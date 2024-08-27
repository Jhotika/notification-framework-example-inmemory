import express, { Response } from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Notifications");
});

export default router;