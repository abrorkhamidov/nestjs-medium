import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { IPagination } from '../core/pagination/pagination';
import { UserListResponseDto } from './dto/response-user.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async getUsers(query: IPagination): Promise<UserListResponseDto> {
    const refunds = await this.usersRepository.getList(query);
    const count = await this.usersRepository.getCount();

    return {
      status: 'OK',
      results: {
        count,
        data: refunds.map((refund) => ({
          id: refund.id,
          email: refund.email,
        })),
      },
    };
  }
}
