import 'reflect-metadata';
import '../../infrastructure/Ioc/container'

import { container } from 'tsyringe';
import { LikeConsumer } from '../../application/queue/LikeConsumer';
import connect from '../db/connect';

async function bootstrap() {
  connect();

  console.log("🚀 Subindo consumer...");

  const consumer = container.resolve(LikeConsumer);
  await consumer.start();
}

bootstrap();
