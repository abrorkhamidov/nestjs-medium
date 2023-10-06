import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ description: 'Title of the post' })
  @IsNotEmpty()
  @IsString()
  @MinLength(5, { message: 'Title should be at least 5 characters' })
  title: string;

  @ApiProperty({ description: 'Content of the post' })
  @IsNotEmpty()
  @IsString()
  content: string;
}
