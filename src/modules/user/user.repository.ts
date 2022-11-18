import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/base/repository/base.repository';
import { TenantProvider } from 'src/providers/tenant.provider';
import { EntityManager } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(tenantProvider: TenantProvider, entityManager: EntityManager) {
    super(tenantProvider, User, entityManager);
  }
}
