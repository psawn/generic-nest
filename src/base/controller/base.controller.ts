import { Body, Get, Post, Query } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { GetEntitiesDto } from '../dto';
import { BaseService } from '../service/base.service';

export class BaseController<E> {
  constructor(private readonly baseService: BaseService<E>) {}

  @Post()
  @ApiOperation({ summary: 'Create new entity' })
  async create(@Body() entity: E) {
    console.log('base controller');
    return this.baseService.createEntity(entity);
  }

  @Get()
  @ApiOperation({ summary: 'Get entities' })
  async get(@Query() getEntitiesDto: GetEntitiesDto) {
    return this.baseService.getEntities(getEntitiesDto);
  }
}
