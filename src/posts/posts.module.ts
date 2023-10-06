import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostsRepository } from './posts.repository';
import { CoreModule } from '../core/core.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [PostsService, PostsRepository],
  controllers: [PostsController],
  imports: [CoreModule, UsersModule],
})
export class PostsModule {}
