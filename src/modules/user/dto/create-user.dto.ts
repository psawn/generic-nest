import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { CreateEntityDto } from 'src/base/dto';

export class CreateUserDto extends CreateEntityDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'Email',
    example: 'test@gmail.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Name',
    example: 'Mark',
  })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  @ApiProperty({
    description: 'Name',
    example: 18,
  })
  age: number;
}
