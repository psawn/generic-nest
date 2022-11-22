import {
  ArgumentMetadata,
  Body,
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
import { CreateEntityDto, GetEntitiesDto, UpdateEntityDto } from '../dto';
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
): Type<IBaseController<E>> {
  const createPipe = new AbstractValidationPipe(
    { whitelist: true, transform: true },
    { body: createEntityDto as unknown as Type<any> },
  );

  class BaseController<E> implements IBaseController<E> {
    constructor(private readonly baseService: BaseService<E>) {}

    @Post()
    @UsePipes(createPipe)
    @ApiOperation({ summary: 'Create new entity' })
    @ApiBody({ type: createEntityDto })
    async createEntity(@Body(ValidationPipe) dto: Type<CreateEntityDto>) {
      console.log('base controller');
      return this.baseService.createEntity(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Get entities' })
    async getEntities(@Query(ValidationPipe) getEntitiesDto: GetEntitiesDto) {
      return this.baseService.getEntities(getEntitiesDto);
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get entity' })
    async getEntity(@Param('id', ParseUUIDPipe) id: string) {
      return this.baseService.getEntity(id);
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update entity' })
    async updateEntity(
      @Param('id', ParseUUIDPipe) id: string,
      @Body(ValidationPipe) updateEntityDto: UpdateEntityDto,
    ) {
      return this.baseService.updateEntity(id, updateEntityDto);
    }
  }

  return BaseController;
}
