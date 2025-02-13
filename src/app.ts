import express, { Express } from "express";
import morgan from "morgan";
import setupSwagger from "../config/swagger";
// import itemRoutes from "./api/v1/routes/itemRoutes";

const app: Express = express();

setupSwagger(app);

app.use(morgan("combined"));
app.use(express.json());

// app.use("/api/v1/items", itemRoutes);

export default app;