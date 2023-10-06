import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostRatingDto {
  @ApiProperty({ description: 'Rating value' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  value: number;

  @ApiProperty({ description: 'Post id' })
  @IsNotEmpty()
  @IsString()
  postId: string;
}
