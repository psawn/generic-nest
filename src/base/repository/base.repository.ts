import { dynamicFilter } from 'src/modules/dynamic-filter/dynamic-filter';
import { TenantProvider } from 'src/providers/tenant.provider';
import { EntityManager, EntityTarget, Repository } from 'typeorm';
import { GetEntitiesDto } from '../dto';
import { IBaseRepository } from './base.repository.interface';

export class BaseRepository<E>
  extends Repository<E>
  implements IBaseRepository<E>
{
  constructor(
    private readonly tenantProvider: TenantProvider,
    target: EntityTarget<E>,
    entityManager: EntityManager,
  ) {
    super(target, entityManager);
  }

  async createEntity(entity: E) {
    console.log('base repository');
    const a = this.test();
    console.log(a);
    return await super.save(entity);
  }

  async getEntities(getEntitiesDto: GetEntitiesDto) {
    const query = dynamicFilter(
      JSON.parse(getEntitiesDto.filter),
      this.createQueryBuilder(),
    );
    return query.getMany();
  }

  test() {
    const a = this.tenantProvider.tenantId;
    console.log('a', a);
  }
}
