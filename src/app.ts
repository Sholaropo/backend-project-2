import express, { Express, Request, Response } from "express";
import { PORT, MONGODB_URI } from "@utils/config";
import * as logger from "@utils/logger";
import mongoose from "mongoose";
import cors from "cors";
import employeesRouter from "@routes/employee";
import branchesRouter from "@routes/branch";

require("express-async-errors");

const app: Express = express();

mongoose.set("strictQuery", false);
logger.info("connecting to", MONGODB_URI);
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());

app.use("/api/employees", employeesRouter);
app.use("/api/branches", employeesRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
