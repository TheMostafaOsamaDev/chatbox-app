import { Get, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisOptions } from './configs/app-options.constants';
import { ConfigModule } from '@nestjs/config';

@Module({
  // imports: [ConfigModule.forRoot(), CacheModule.registerAsync(RedisOptions)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  @Get('/redis')
  getHello(): string {
    return `${process.env.REDIS_HOST} * ${process.env.REDIS_PORT}`;
  }
}
