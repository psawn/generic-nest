import { EntityToViewDto } from 'src/base/dtos';
import { User } from '../user.entity';

export class UserToViewDto extends EntityToViewDto {
  name: string;

  email: string;

  age: number;

  constructor(user: User) {
    super(user);
    this.name = user.name;
    this.email = user.email;
    this.age = user.age;
  }
}
