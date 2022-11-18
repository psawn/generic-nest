import { Controller } from '@nestjs/common';
import { BaseController } from 'src/base/controller/base.controller';
import { User } from './user.entity';
import { UsersService } from './user.service';

@Controller()
export class UsersController extends BaseController<User> {
  constructor(private readonly userService: UsersService) {
    super(userService);
  }
}
