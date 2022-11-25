import { Inject, Type } from '@nestjs/common';
import { dynamicFilter } from 'src/modules/dynamic-filter/dynamic-filter';
import { IFilterOption } from 'src/modules/dynamic-filter/dynamic-filter.interface';
import { TenantProvider } from 'src/providers/tenant.provider';
import {
  DeepPartial,
  DeleteResult,
  EntityManager,
  EntityTarget,
  FindOptionsWhere,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { CreateEntityDto } from '../dtos';
import { IBaseRepository } from './base.repository.interface';

export class BaseRepository<E>
  extends Repository<E>
  implements IBaseRepository<E>
{
  @Inject()
  private readonly tenantProvider: TenantProvider;

  constructor(
    // private readonly tenantProvider: TenantProvider,
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

  toQueryBuilder(filter: IFilterOption) {
    return dynamicFilter(filter, this.createQueryBuilder());
  }

  async getEntities(query: SelectQueryBuilder<E>) {
    const result = await query.getManyAndCount();
    return result;
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
    return await this.update(criteria, partialEntity);
  }

  async deleteEntity(id: string): Promise<DeleteResult> {
    throw new Error('Method not implemented.');
  }

  test() {
    const a = this.tenantProvider.tenantId;
    console.log('call test function', a);
  }
}
