import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import Errorhandler from "./utils/errorHandler";
import AppError from "./utils/appError";
import { writeLogToFile, createLogFile, backupLogFile } from "./utils/logger";
import OrderRoutes from "./routes/order"
const app = express();

const PORT: number = 8001;

app.use(
  cors({
    origin: "*",
  })
);

let list_services = ["order"]


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "5mb" }));

const logInterval = 24 * 60 * 60 * 1000; // 24 jam dalam milidetik
// let currentLogFileName = createLogFile();

// // Buat file log baru setiap 24 jam
setInterval(() => {
  list_services.forEach((element) => {
    backupLogFile(element);
  });

  console.log("create log file");
}, logInterval);


app.get("/", (req: Request, res: Response) =>
  res.send({ message: "Welcome to Hahahaha" })
);

app.use("/order",OrderRoutes)


app.all("*", (req: Request, res: Response, next: any) => {
  next(new AppError(`The URL ${req.originalUrl} does not exists`, 404));
});

app.use(Errorhandler);

app.listen(PORT, () =>
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
);


