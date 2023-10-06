import { ApiProperty } from '@nestjs/swagger';
import { StatusResponseDto } from '../../core/responses/status-response.dto';

export class UserDto {
  @ApiProperty({
    description: 'User id',
    example: '3cee182b-02c6-43b9-b3ed-23285d2f4e01',
  })
  id: string;

  @ApiProperty({
    description: 'User email',
    example: 'test@gmail.com',
  })
  email: string;
}

export class UserListDto {
  @ApiProperty({
    description: 'Count Users',
  })
  count: number;

  @ApiProperty({
    description: 'List Users',
    type: [UserDto],
  })
  data: UserDto[];
}

export class UserListResponseDto extends StatusResponseDto<UserListDto> {
  @ApiProperty({ description: 'Users', type: UserListDto })
  results: UserListDto;
}
