import "dotenv/config";
import "reflect-metadata";
import "../infrastructure/Ioc/container"
import express from 'express';
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../infrastructure/swagger/swagger";
import router from '../interfaces/http/routes/index'
import { redisClient } from "../infrastructure/cache/redisClient";

const app = express();

app.use(express.json());

app.use(router);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

async function startRedis() {
  await redisClient.connect(); // 🔥 ESSENCIAL

  app.listen(3000, () => {
    console.log('Server rodando');
  });
}

startRedis();

export default app;