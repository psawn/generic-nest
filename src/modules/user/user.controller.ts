import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseControllerFactory } from 'src/base/controller/base.controller';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './user.entity';
import { UsersService } from './user.service';

@ApiTags('Users')
@Controller('users')
export class UsersController extends BaseControllerFactory<User>(
  CreateUserDto,
  UpdateUserDto,
) {
  constructor(private readonly userService: UsersService) {
    super(userService);
  }
}
