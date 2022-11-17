import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantProvider } from 'src/providers/tenant.provider';
import { UsersController } from './user.controller';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { UsersService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, UserRepository, TenantProvider],
  controllers: [UsersController],
})
export class UsersModule {}
