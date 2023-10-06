import { ApiProperty } from '@nestjs/swagger';
import { StatusResponseDto } from '../../core/responses/status-response.dto';

export class SinglePostDto {
  @ApiProperty({
    description: 'Post id',
    example: '3cee182b-02c6-43b9-b3ed-23285d2f4e01',
  })
  id: string;

  @ApiProperty({
    description: 'Post title',
    example: 'Post title',
  })
  title: string;

  @ApiProperty({
    description: 'Post content',
    example: 'Post content',
  })
  content: string;

  @ApiProperty({
    description: 'Post rating',
    example: 4.8,
  })
  rating: number;

  @ApiProperty({
    description: 'Post readTime',
    example: 10,
  })
  readTime: number;
}

export class PostDto {
  @ApiProperty({
    description: 'Post id',
    example: '3cee182b-02c6-43b9-b3ed-23285d2f4e01',
  })
  id: string;

  @ApiProperty({
    description: 'Post title',
    example: 'Post title',
  })
  title: string;

  @ApiProperty({
    description: 'Post content',
    example: 'Post content',
  })
  content: string;
}

export class PostListDto {
  @ApiProperty({
    description: 'Count Posts',
  })
  count: number;

  @ApiProperty({
    description: 'List Posts',
    type: [PostDto],
  })
  data: PostDto[];
}

export class PostListResponseDto extends StatusResponseDto<PostListDto> {
  @ApiProperty({ description: 'Posts', type: PostListDto })
  results: PostListDto;
}

export class PostResponseDto extends StatusResponseDto<SinglePostDto> {
  @ApiProperty({ description: 'Post', type: SinglePostDto })
  results: SinglePostDto;
}

export class CreatedPostDto {
  @ApiProperty({
    description: 'Post id',
    example: 'a0ce4892-2319-4db8-ba5e-4939e1a72944',
  })
  id: string;
}

export class CreatePostResponseDto extends StatusResponseDto<CreatedPostDto> {
  @ApiProperty({ description: 'Post id', type: CreatedPostDto })
  results: CreatedPostDto;
}
