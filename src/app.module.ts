import { Module } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './modules/user/user.module';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private entityManager: EntityManager) {}
}
