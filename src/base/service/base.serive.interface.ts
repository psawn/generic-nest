import { Type } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateEntityDto, GetEntitiesDto, UpdateEntityDto } from '../dto';
import { IPagination } from '../interfaces';

export interface IBaseService<E> {
  createEntity(createEntityDto: Type<CreateEntityDto>): Promise<E>;

  getEntities(getEntitiesDto: GetEntitiesDto): Promise<{
    items: E[];
    pagination: IPagination;
  }>;

  getEntity(id: string): Promise<E>;

  updateEntity(
    id: string,
    updateEntityDto: UpdateEntityDto,
  ): Promise<UpdateResult>;

  deleteEntity(id: string): Promise<DeleteResult>;
}
