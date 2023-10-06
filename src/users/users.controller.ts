import { Controller, Get, Query, Version } from '@nestjs/common';
import { UsersService } from './users.service';
import { IPagination } from 'src/core/pagination/pagination';
import { UserListResponseDto } from './dto/response-user.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Get users' })
  @ApiBearerAuth('access-token')
  @ApiResponse({
    type: () => UserListResponseDto,
  })
  @Version('1')
  @Get('')
  getAllUsers(@Query() query: IPagination) {
    return this.usersService.getUsers(query);
  }
}
