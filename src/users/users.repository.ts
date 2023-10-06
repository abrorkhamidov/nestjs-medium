import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../core/prisma/prisma.service';
import { IPagination } from 'src/core/pagination/pagination';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async getCount() {
    return this.prisma.user.count({});
  }

  async getList(query: IPagination) {
    return await this.prisma.user.findMany({
      take: query.limit,
      skip: (query.page - 1) * query.limit,
      include: {
        posts: true,
        ratings: true,
      },
    });
  }

  async getUserById(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return user;
  }
}
