import express, { Response } from "express";
const router = express.Router();

router.post("/", (req, res) => {
  const message = req.body.message;
  res.status(200).json({ message });
});

export default router;