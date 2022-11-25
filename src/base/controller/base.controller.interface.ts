import { Type } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import {
  CreateEntityDto,
  EntityToViewDto,
  GetEntitiesDto,
  UpdateEntityDto,
} from '../dtos';
import { IPagination } from '../interfaces';

export interface IBaseController<E> {
  createEntity(
    createEntityDto: Type<CreateEntityDto>,
  ): Promise<EntityToViewDto>;

  getEntities(getEntitiesDto: GetEntitiesDto): Promise<{
    items: E[];
    pagination: IPagination;
  }>;

  getEntity(id: string): EntityToViewDto;

  updateEntity(
    id: string,
    updateEntityDto: UpdateEntityDto,
  ): Promise<UpdateResult>;

  deleteEntity(id: string): Promise<DeleteResult>;
}
