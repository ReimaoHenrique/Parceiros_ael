import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import type { IncomingMessage, ServerResponse } from 'http';
import { AppModule } from '../src/app.module';

let app: NestFastifyApplication | null = null;

async function getApp(): Promise<NestFastifyApplication> {
  if (app) {
    return app;
  }

  app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.init();
  await app.getHttpAdapter().getInstance().ready();

  return app;
}

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  const nestApp = await getApp();
  nestApp.getHttpAdapter().getInstance().server.emit('request', req, res);
}
