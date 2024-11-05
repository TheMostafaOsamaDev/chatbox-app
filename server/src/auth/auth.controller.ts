import {
  Body,
  ConflictException,
  Controller,
  Get,
  NotFoundException,
  Post,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDecorator, RegisterDecorator } from './swagger.decorators';
import { CreateUserDto } from './dto/create-user.dto';
import { UserInterceptor } from './user.interceptor';
import { LogInUserDto } from './dto/login-user.dto';
import { Request, Response } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @RegisterDecorator()
  @UseInterceptors(UserInterceptor)
  async register(@Body() createUserDto: CreateUserDto, @Req() req: Request) {
    if (req.isFound) {
      throw new ConflictException('User already exists');
    }

    return this.authService.register(createUserDto);
  }

  @Post('login')
  @LoginDecorator()
  @UseInterceptors(UserInterceptor)
  async login(
    @Body() logInUserDto: LogInUserDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    if (!req.isFound) {
      throw new NotFoundException('User not found');
    }

    return this.authService.logIn(res, logInUserDto, req.user);
  }
}
