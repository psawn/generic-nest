import { GetEntitiesDto } from '../dto';

export interface IBaseRepository<E> {
  createEntity(entity: E);
  getEntities(getEntitiesDto: GetEntitiesDto);
}
