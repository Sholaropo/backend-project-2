import morgan from "morgan";
import express from "express";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(morgan("combined"));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/health", (req, res) => {
  res.status(200).send("Server is healthy");
});

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

export default app;
