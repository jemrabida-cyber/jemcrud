import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getWelcome() {
    return {
      message: '🎉 JemCRUD API Server is running!',
      version: '1.0.0',
      endpoints: {
        authentication: {
          signup: 'POST /auth/signup',
          login: 'POST /auth/login',
        },
        positions: {
          getAll: 'GET /positions',
          getOne: 'GET /positions/:id',
          create: 'POST /positions',
          update: 'PATCH /positions/:id',
          delete: 'DELETE /positions/:id',
        },
      },
      frontend: 'http://localhost:5173',
      documentation: 'Check README.md for full API documentation',
    };
  }

  @Get('health')
  healthCheck() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }
}
