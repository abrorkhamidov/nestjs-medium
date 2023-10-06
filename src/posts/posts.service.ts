import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { QueryPostsDto } from './dto/query-post.dto';
import { UsersRepository } from 'src/users/users.repository';
import { CreatePostRatingDto } from './dto/create-post-rating.dto';

@Injectable()
export class PostsService {
  constructor(
    private postsRepository: PostsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async createPost(authorId: string, data: CreatePostDto) {
    return this.postsRepository.createPost({
      ...data,
      author: {
        connect: {
          id: authorId,
        },
      },
    });
  }

  async getPostsByUserId(query: QueryPostsDto) {
    const posts = await this.postsRepository.getPostsByUserId(query);
    const count = await this.postsRepository.getPostsCountByUserId(
      query.authorId,
    );

    return {
      status: 'OK',
      results: {
        count,
        data: posts.map((post) => ({
          id: post.id,
          title: post.title,
          content: post.content,
        })),
      },
    };
  }

  async getPostById(postId: string) {
    const post = await this.postsRepository.getPostById(postId);
    const rating = this.calculateRating(post.ratings);
    const readTime = this.calculateReadingTime(post.content);

    return {
      status: 'OK',
      results: {
        data: {
          ...post,
          rating,
          readTime,
        },
      },
    };
  }

  async addPostRating(userId: string, postRatingDto: CreatePostRatingDto) {
    const user = await this.usersRepository.getUserById(userId);
    const post = await this.postsRepository.getPostById(postRatingDto.postId);

    if (user.id === post.authorId) {
      throw new HttpException(
        'You cannot rate your own post',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.postsRepository.addPostRating(
      userId,
      postRatingDto.postId,
      postRatingDto.value,
    );
  }

  private calculateReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const numberOfWords = content.split(/\s+/).length;
    return Math.ceil(numberOfWords / wordsPerMinute);
  }

  private calculateRating(ratings: { value: number }[]): number {
    if (!ratings || ratings.length === 0) {
      return 0;
    }

    const totalRating = ratings.reduce((acc, rating) => acc + rating.value, 0);
    return totalRating / ratings.length;
  }
}
