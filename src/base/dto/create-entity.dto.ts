import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateEntityDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'Test',
    example: 'Test',
  })
  test: string;
}
