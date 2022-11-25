import { NotFoundException, Type } from '@nestjs/common';
import { PaginationConstants } from 'src/common/constants';
import { IFilterOption } from 'src/modules/dynamic-filter/dynamic-filter.interface';
import { DeleteResult, FindOptionsWhere } from 'typeorm';
import { CreateEntityDto, GetEntitiesDto, UpdateEntityDto } from '../dtos';
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
    const filter: IFilterOption = JSON.parse(getEntitiesDto.filter);
    const page = +filter.page || PaginationConstants.DEFAULT_PAGE;
    const limit = +filter.limit || PaginationConstants.DEFAULT_LIMIT_ITEM;

    const query = this.baseRepository.toQueryBuilder(filter);

    const [items, totalItems] = await this.baseRepository.getEntities(query);

    return {
      items,
      pagination: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: +limit,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: +page,
      },
    };
  }

  async getEntity(id: string) {
    const criteria = { id } as unknown as FindOptionsWhere<E>;
    const entity = this.baseRepository.getEntity(criteria);

    if (!entity) {
      throw new NotFoundException('Not found');
    }

    return entity;
  }

  async updateEntity(id: string, updateEntityDto: UpdateEntityDto) {
    const criteria = { id } as unknown as FindOptionsWhere<E>;
    return this.baseRepository.updateEntity(criteria, { ...updateEntityDto });
  }

  async deleteEntity(id: string): Promise<DeleteResult> {
    return this.baseRepository.deleteEntity(id);
  }
}
