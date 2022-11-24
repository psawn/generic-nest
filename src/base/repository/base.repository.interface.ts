import { Type } from '@nestjs/common';
import {
  DeleteResult,
  FindOptionsWhere,
  SelectQueryBuilder,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { CreateEntityDto } from '../dto';

export interface IBaseRepository<E> {
  createEntity(createEntityDto: Type<CreateEntityDto>): Promise<E>;

  getEntities(query: SelectQueryBuilder<E>): Promise<[E[], number]>;

  getEntity(criteria: FindOptionsWhere<E>): Promise<E>;

  updateEntity(
    criteria: FindOptionsWhere<E>,
    partialEntity: QueryDeepPartialEntity<E>,
  ): Promise<UpdateResult>;

  deleteEntity(id: string): Promise<DeleteResult>;
}
