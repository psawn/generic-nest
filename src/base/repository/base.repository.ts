import { Type } from '@nestjs/common';
import { dynamicFilter } from 'src/modules/dynamic-filter/dynamic-filter';
import { TenantProvider } from 'src/providers/tenant.provider';
import {
  DeepPartial,
  EntityManager,
  EntityTarget,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { CreateEntityDto, GetEntitiesDto } from '../dto';
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

  async createEntity(createEntityDto: Type<CreateEntityDto>): Promise<E> {
    console.log('base repository');
    const entity: E = this.create({ ...createEntityDto } as DeepPartial<E>);
    this.test();
    return await this.save(entity);
  }

  async getEntities(getEntitiesDto: GetEntitiesDto) {
    const query = dynamicFilter(
      JSON.parse(getEntitiesDto.filter),
      this.createQueryBuilder(),
    );
    return await query.getMany();
  }

  async getEntity(criteria: FindOptionsWhere<E>) {
    return await this.findOne({
      where: criteria,
    });
  }

  async updateEntity(
    criteria: FindOptionsWhere<E>,
    partialEntity: QueryDeepPartialEntity<E>,
  ) {
    await this.update(criteria, partialEntity);
  }

  private dynamicFilter() {
    //
  }

  test() {
    const a = this.tenantProvider.tenantId;
    console.log('a', a);
  }
}
