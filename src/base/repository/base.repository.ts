// import { Injectable } from '@nestjs/common';
import { TenantProvider } from 'src/providers/tenant.provider';
import {
  EntityManager,
  Repository,
  EntityTarget,
  FindOneOptions,
} from 'typeorm';
import { IBaseRepository } from './base.repository.interface';

export class BaseRepository<E>
  extends Repository<E>
  implements IBaseRepository<E>
{
  constructor(
    private readonly tenantProvider: TenantProvider,
    target: EntityTarget<E>,
    manager: EntityManager,
  ) {
    super(target, manager);
  }

  createEntity(entity: E): E {
    return this.create(entity);
  }

  async findOneByCondition(options: FindOneOptions<E>): Promise<E> {
    return await this.findOne(options);
  }

  test() {
    const a = this.tenantProvider.tenantId;
    console.log('a', a);
  }
}
