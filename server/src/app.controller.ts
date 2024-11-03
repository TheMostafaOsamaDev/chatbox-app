import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    console.log(process.env);
    return `${process.env.REDIS_HOST} * ${process.env.REDIS_PORT}`;
  }
}
