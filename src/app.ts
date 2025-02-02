import express, { Express } from "express";
import { PORT, MONGODB_URI } from "../utils/config";
import * as logger from "../utils/logger";
import mongoose from "mongoose";
import cors from "cors";
import employeesRouter from "./api/v1/routes/employee";
import branchesRouter from "./api/v1/routes/branch";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "../utils/swagger";
import { errorHandler, unknownEndpoint } from "../utils/middleware";
import morgan from "morgan";
import "express-async-errors";

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
app.use(morgan("combined"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1/employees", employeesRouter);
app.use("/api/v1/branches", branchesRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
  });
}

export default app
