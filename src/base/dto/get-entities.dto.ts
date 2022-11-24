import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetEntitiesDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Filter',
    example: `{"filters":[{"field":"name","operator":"Equal","value":"Mark","logic":"AND"}],"sorts":[{"field":"email","dir":"DESC"}]}`,
  })
  filter: string;
}
