import { TypeORMRepository } from 'src/database/typeorm.repository';
import { User } from './user.entity';

export class UserRepository extends TypeORMRepository<User> {}
