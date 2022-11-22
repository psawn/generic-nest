import { Type } from '@nestjs/common';
import { FindOptionsWhere } from 'typeorm';
import { CreateEntityDto, GetEntitiesDto, UpdateEntityDto } from '../dto';
import { BaseRepository } from '../repository/base.repository';
import { IBaseService } from './base.serive.interface';

export class BaseService<E> implements IBaseService<E> {
  constructor(private readonly baseRepository: BaseRepository<E>) {}

  async createEntity(createEntityDto: Type<CreateEntityDto>): Promise<E> {
    console.log('base service');
    console.log('createEntityDto', createEntityDto);
    return this.baseRepository.createEntity(createEntityDto);
  }

  async getEntities(getEntitiesDto: GetEntitiesDto) {
    return this.baseRepository.getEntities(getEntitiesDto);
  }

  async getEntity(id: string) {
    const criteria = { id } as unknown as FindOptionsWhere<E>;
    return this.baseRepository.getEntity(criteria);
  }

  async updateEntity(id: string, updateEntityDto: UpdateEntityDto) {
    const criteria = { id } as unknown as FindOptionsWhere<E>;
    return this.baseRepository.updateEntity(criteria, { ...updateEntityDto });
  }
}
