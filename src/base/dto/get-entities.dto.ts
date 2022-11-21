import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetEntitiesDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  filter: string;
}
