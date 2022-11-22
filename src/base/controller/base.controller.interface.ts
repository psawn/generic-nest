import { Type } from '@nestjs/common';
import { CreateEntityDto, GetEntitiesDto, UpdateEntityDto } from '../dto';

export interface IBaseController<E> {
  createEntity(createEntityDto: Type<CreateEntityDto>): Promise<E>;
  getEntities(getEntitiesDto: GetEntitiesDto);
  getEntity(id: string);
  updateEntity(id: string, updateEntityDto: UpdateEntityDto);
}
