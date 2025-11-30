import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for both local development and production
  app.enableCors({
    origin: [
      /^http:\/\/localhost:\d+$/,           // Local development
      /^https:\/\/.*\.vercel\.app$/,        // Vercel deployments
      process.env.FRONTEND_URL,             // Custom domain (optional)
    ].filter(Boolean),
    credentials: true,
  });

  const port = Number(process.env.PORT) || 3000;
  await app.listen(port);
  console.log(`Server is running on http://localhost:${port}`);
}
bootstrap();
