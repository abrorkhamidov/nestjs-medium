import { ApiProperty } from '@nestjs/swagger';
import { IPagination } from '../../core/pagination/pagination';

export class QueryPostsDto extends IPagination {
  @ApiProperty({
    description: 'Author id',
    required: true,
    example: '3cee182b-02c6-43b9-b3ed-23285d2f4e01',
  })
  authorId: string;
}
