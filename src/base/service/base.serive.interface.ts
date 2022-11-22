import { Type } from '@nestjs/common';
import { CreateEntityDto, GetEntitiesDto } from '../dto';

export interface IBaseService<E> {
  createEntity(createEntityDto: Type<CreateEntityDto>): Promise<E>;
  getEntities(getEntitiesDto: GetEntitiesDto): Promise<E[]>;
}
