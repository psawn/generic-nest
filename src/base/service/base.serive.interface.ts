import { GetEntitiesDto } from '../dto';

export interface IBaseService<E> {
  createEntity(entity: E): Promise<E>;
  getEntities(getEntitiesDto: GetEntitiesDto): Promise<E[]>;
}
