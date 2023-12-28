import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma-service/prisma.service';
import { Users, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async getAllUsers(): Promise<Users[]> {
    return await this.prisma.users.findMany();
  }
  private async existUser(id: string): Promise<Users | undefined> {
    const listUsers = await this.getAllUsers();
    return listUsers.find((element) => element.id === id);
  }
  async getOneUser(id: string): Promise<Users> {
    const validateExistUser = await this.existUser(id);
    if (validateExistUser !== undefined) {
      return await this.prisma.users.findUnique({
        where: {
          id,
        },
      });
    }
    throw new NotFoundException('Not found');
  }
  async createUser(data: Prisma.UsersCreateInput): Promise<Users> {
    try {
      if (data) {
        return await this.prisma.users.create({
          data,
        });
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async updateUser(id: string, data: Prisma.UsersUpdateInput) {
    const validateExistUser = await this.existUser(id);
    if (validateExistUser !== undefined) {
      return await this.prisma.users.update({
        where: {
          id,
        },
        data,
      });
    }
    throw new NotFoundException('Not found');
  }
  async deleteUser(id: string) {
    const validateExistUser = await this.existUser(id);
    if (validateExistUser !== undefined) {
      return await this.prisma.users.delete({
        where: {
          id,
        },
      });
    }
    throw new NotFoundException('Not found');
  }
}
