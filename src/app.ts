import express, { Express } from "express";
import morgan from "morgan";
import setupSwagger from "../config/swagger";
import branchRoutes from "./api/v1/routes/branchRoutes";
import employeeRoutes from "./api/v1/routes/employeeRoutes";
import errorHandler from "./api/v1/middleware/errorHandler";

const app: Express = express();

setupSwagger(app);

app.use(morgan("combined"));
app.use(express.json());

app.get("/health", (req, res) => {
    res.status(200).send("Server is healthy");
});

app.use("/api/v1/branches", branchRoutes);
app.use("/api/v1/employees", employeeRoutes);

app.use(errorHandler);

export default app;