import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Observable } from 'rxjs';
import { User } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();

    if (req.body.email) {
      const user = await this.userModel.findOne({ email: req.body.email });

      req.user = user?.toJSON();
      req.isFound = user ? true : false;
    } else {
      req.isFound = false;
    }

    return next.handle();
  }
}
