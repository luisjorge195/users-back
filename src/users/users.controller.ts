import { UsersService } from './users.service';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }
  @Get(':id')
  getOneUsers(@Param('id') id: string) {
    return this.usersService.getOneUser(id);
  }
  @Post()
  createUser(@Body() postDataUser: Prisma.UsersCreateInput) {
    try {
      return this.usersService.createUser({
        nombre: postDataUser.nombre,
        fechaNacimiento: postDataUser.fechaNacimiento,
        genero: postDataUser.genero,
      });
    } catch (error) {
      throw new BadRequestException('Error al procesar la solicitud', {
        cause: new Error(),
        description: 'Some error description',
      });
    }
  }
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body() updateDataUser: Prisma.UsersUpdateInput,
  ) {
    return this.usersService.updateUser(id, updateDataUser);
  }
}
