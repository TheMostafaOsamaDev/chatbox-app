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

@Injectable()
export class AuthService {
  constructor(
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  @Post('register')
  async register(createUserDto: CreateUserDto) {
    const user = new this.userModel(createUserDto);
    await user.save();

    user.password = undefined;

    return user;
  }

  async logIn(logInUserDto: LogInUserDto, user: User) {
    const isPasswordValid = await User.verifyPassword(
      logInUserDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    user.password = undefined;
  }
}
