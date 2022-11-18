import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getUser() {
    this.userRepository.test();
    return await this.userRepository.findOneByCondition({
      where: { tenantId: '1' },
    });
  }
}
