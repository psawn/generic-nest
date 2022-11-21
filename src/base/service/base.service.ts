import { GetEntitiesDto } from '../dto';
import { BaseRepository } from '../repository/base.repository';
import { IBaseService } from './base.serive.interface';

export class BaseService<E> implements IBaseService<E> {
  constructor(private readonly baseRepository: BaseRepository<E>) {}
  async createEntity(entity: E): Promise<E> {
    return await this.baseRepository.createEntity(entity);
  }

  async getEntities(getEntitiesDto: GetEntitiesDto) {
    return await this.baseRepository.getEntities(getEntitiesDto);
  }
}
