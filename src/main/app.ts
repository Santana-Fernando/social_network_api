import "reflect-metadata";
import "../infrastructure/Ioc/container"
import express from 'express';
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../infrastructure/swagger/swagger";
import router from '../interfaces/http/routes/index'

const app = express();

app.use(express.json());

app.use(router);
// Swagger UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


export default app;