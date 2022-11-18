import { BaseRepository } from '../repository/base.repository';
import { IBaseService } from './base.serive.interface';

export class BaseService<E> implements IBaseService<E> {
  constructor(private readonly baseRepository: BaseRepository<E>) {}

  async createUser(entity: E) {
    console.log('base service');
    return await this.baseRepository.createEntity(entity);
  }
}
