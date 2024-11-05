import {
  Inject,
  Injectable,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cache } from 'cache-manager';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { LogInUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { compareValues, hashValue } from 'src/utils/utils';
import { Response } from 'express';
import { cookieExpireTime } from 'src/configs/constants';

@Injectable()
export class AuthService {
  constructor(
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  @Post('register')
  async register(createUserDto: CreateUserDto) {
    const user = new this.userModel({
      ...createUserDto,
      username: User.generateUsername(createUserDto.email),
    });
    await user.save();

    user.password = undefined;

    return user;
  }

  async logIn(res: Response, logInUserDto: LogInUserDto, user: User) {
    const isPasswordValid = await User.verifyPassword(
      logInUserDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    user.password = undefined;

    const payload = {
      ...user,
    };

    const token = this.jwtService.sign(payload);
    const hashedToken = await hashValue(token);

    res.cookie('authorization', token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      expires: cookieExpireTime,
    });

    // @ts-ignore
    const userId = user?._id?.toString();

    await this.cacheManager.set(userId, hashedToken);

    return res.json(user);
  }
}
