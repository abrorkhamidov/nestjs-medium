import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../core/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { QueryPostsDto } from './dto/query-post.dto';

@Injectable()
export class PostsRepository {
  constructor(private prisma: PrismaService) {}

  async createPost(postDto: Prisma.PostCreateInput) {
    return this.prisma.post.create({
      data: {
        ...postDto,
      },
    });
  }

  async getPostsCountByUserId(authorId: string) {
    return this.prisma.post.count({ where: { authorId: authorId } });
  }

  async getPostsByUserId(query: QueryPostsDto) {
    return this.prisma.post.findMany({
      where: { authorId: query.authorId },
      take: query.limit,
      skip: (query.page - 1) * query.limit,
    });
  }

  async getPostById(postId: string) {
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
      include: {
        ratings: true,
      },
    });

    if (!post) {
      throw new HttpException('Post not found', 404);
    }

    return post;
  }

  async addPostRating(userId: string, postId: string, rating: number) {
    return this.prisma.postRating.create({
      data: {
        value: rating,
        post: {
          connect: {
            id: postId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }
}
