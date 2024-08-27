import express, { Request, Response, NextFunction } from "express";
import path from "path";
import notificationsRouter from "./routes/notifications/index";

const PORT = 8000;
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(express.static(path.join(__dirname, "public")));


app.get("/", (req: Request, res: Response) => {
  res.render("home", { title: "Notification Framework In Memory Implementation" });
});

app.use("/notifications", notificationsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});