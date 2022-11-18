import { FindOneOptions } from 'typeorm';

export interface IBaseRepository<E> {
  createEntity(entity: E): E;
  findOneByCondition(options: FindOneOptions<E>): Promise<E>;
}
