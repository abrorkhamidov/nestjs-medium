import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  Version,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  CreatePostResponseDto,
  PostListResponseDto,
  PostResponseDto,
} from './dto/response-post.dto';
import { JwtAuthGuard } from '../auth/auth.guard';
import { User } from 'src/auth/decorators/user.decorator';
import { IUser } from 'src/auth/dto/IUser';
import { QueryPostsDto } from './dto/query-post.dto';
import { CreatePostRatingDto } from './dto/create-post-rating.dto';

@Controller('posts')
@UseGuards(JwtAuthGuard)
export class PostsController {
  constructor(private postsService: PostsService) {}

  @ApiOperation({ summary: 'Create post' })
  @ApiBearerAuth('access-token')
  @ApiResponse({
    type: () => CreatePostResponseDto,
  })
  @Version('1')
  @Post('')
  createPost(@User() user: IUser, @Body() data: CreatePostDto) {
    return this.postsService.createPost(user.id, data);
  }

  @ApiOperation({ summary: 'Add post rating' })
  @ApiBearerAuth('access-token')
  @ApiResponse({
    type: () => CreatePostResponseDto,
  })
  @Version('1')
  @Post('add-rating')
  addPostRating(@User() user: IUser, @Body() data: CreatePostRatingDto) {
    return this.postsService.addPostRating(user.id, data);
  }

  @ApiOperation({ summary: 'Get user posts' })
  @ApiBearerAuth('access-token')
  @ApiResponse({
    type: () => PostListResponseDto,
  })
  @Version('1')
  @Get('')
  getPostsByUserId(@Query() query: QueryPostsDto) {
    return this.postsService.getPostsByUserId(query);
  }

  @ApiOperation({ summary: 'Get post by id' })
  @ApiBearerAuth('access-token')
  @ApiResponse({
    type: () => PostResponseDto,
  })
  @Version('1')
  @Get(':postId')
  getPostById(@Param('postId') postId: string) {
    return this.postsService.getPostById(postId);
  }
}
