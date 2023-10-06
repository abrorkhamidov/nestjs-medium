import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { CoreModule } from '../core/core.module';

@Module({
  providers: [UsersService, UsersRepository],
  controllers: [UsersController],
  imports: [CoreModule],
  exports: [UsersRepository],
})
export class UsersModule {}
