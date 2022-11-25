import {
  ArgumentMetadata,
  Body,
  Delete,
  Get,
  Injectable,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Type,
  UsePipes,
  ValidationPipe,
  ValidationPipeOptions,
} from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import {
  CreateEntityDto,
  GetEntitiesDto,
  UpdateEntityDto,
  EntityToViewDto,
  ViewDtoContructor,
} from '../dtos';
import { BaseService } from '../service/base.service';
import { IBaseController } from './base.controller.interface';

@Injectable()
export class AbstractValidationPipe extends ValidationPipe {
  constructor(
    options: ValidationPipeOptions,
    private readonly targetTypes: {
      body?: Type<any>;
      query?: Type<any>;
      param?: Type<any>;
      custom?: Type<any>;
    },
  ) {
    super(options);
  }

  async transform(value: any, metadata: ArgumentMetadata) {
    const targetType = this.targetTypes[metadata.type];

    if (!targetType) {
      return super.transform(value, metadata);
    }

    return super.transform(value, { ...metadata, metatype: targetType });
  }
}

export function BaseControllerFactory<E>(
  createEntityDto: typeof CreateEntityDto,
  updateEntityDto: typeof UpdateEntityDto,
  // entityToViewDto: typeof EntityToViewDto,
  entityToViewDto: ViewDtoContructor<E>,
): Type<IBaseController<E>> {
  const createPipe = new AbstractValidationPipe(
    { whitelist: true, transform: true },
    { body: createEntityDto as unknown as Type<any> },
  );
  const updatePipe = new AbstractValidationPipe(
    { whitelist: true, transform: true },
    { body: updateEntityDto as unknown as Type<any> },
  );
  class BaseController implements IBaseController<E> {
    constructor(private readonly baseService: BaseService<E>) {}

    @Post()
    @UsePipes(createPipe)
    @ApiOperation({ summary: 'Create new entity' })
    @ApiBody({ type: createEntityDto })
    async createEntity(@Body(ValidationPipe) dto: Type<CreateEntityDto>) {
      console.log('base controller');
      const entity = await this.baseService.createEntity(dto);
      return new entityToViewDto(entity);
    }

    @Get()
    @ApiOperation({ summary: 'Get entities' })
    async getEntities(@Query(ValidationPipe) getEntitiesDto: GetEntitiesDto) {
      return this.baseService.getEntities(getEntitiesDto);
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get entity' })
    async getEntity(@Param('id', ParseUUIDPipe) id: string) {
      const entity = await this.baseService.getEntity(id);
      return new entityToViewDto(entity);
    }

    @Patch('/:id')
    @UsePipes(updatePipe)
    @ApiOperation({ summary: 'Update entity' })
    @ApiBody({ type: updateEntityDto })
    async updateEntity(
      @Param('id', ParseUUIDPipe) id: string,
      @Body(ValidationPipe) updateEntityDto: UpdateEntityDto,
    ) {
      return this.baseService.updateEntity(id, updateEntityDto);
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete entity' })
    async deleteEntity(
      @Param('id', ParseUUIDPipe) id: string,
    ): Promise<DeleteResult> {
      return this.baseService.deleteEntity(id);
    }
  }

  return BaseController;
}
