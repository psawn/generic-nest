import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/service/base.service';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository);
  }
}
