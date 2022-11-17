import { Injectable } from '@nestjs/common';
import { TenantProvider } from 'src/providers/tenant.provider';
import { EntityManager, Repository, EntitySchema } from 'typeorm';

@Injectable()
export class TypeORMRepository<T> extends Repository<T> {
  constructor(
    private readonly tenantProvider: TenantProvider,
    manager: EntityManager,
  ) {
    super(EntitySchema, manager);
  }

  test() {
    const a = this.tenantProvider.tenantId;
    console.log('a', a);
  }
}
