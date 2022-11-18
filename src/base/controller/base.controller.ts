import { Body, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { BaseService } from '../service/base.service';

export class BaseController<E> {
  constructor(private readonly baseService: BaseService<E>) {}

  @Post()
  @ApiOperation({ summary: 'Create new entity' })
  async create(@Body() entity: E) {
    console.log('base controller');
    return await this.baseService.createUser(entity);
  }
}
