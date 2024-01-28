// Nest
import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// Service
import { AdminService } from './admin.service';

// Interfaces
import { User } from 'src/users/interfaces/user';
import { Posts } from 'src/posts/interfaces/post';

// Dto
import { UpdatePostDto } from 'src/posts/dto/update-post';

// Auth
import { Auth } from 'src/auth/decorators/auth.decorator';

@ApiTags('Admin')
@Auth('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('/users')
  @ApiOperation({ summary: 'Ver listado de usuarios'})
  @ApiResponse({ status: 200, description: 'Listado detallado de usuarios'})
  @ApiResponse({ status: 401, description: 'No tiene los permisos para realizar esta accion'})
  async getUsers(): Promise<User[]> {
    return await this.adminService.getUsers();
  }

  @Delete('/users/:id')
  @ApiOperation({ summary: 'Eliminar usuario'})
  @ApiResponse({ status: 200, description: 'Usuario eliminado con exito'})
  @ApiResponse({ status: 401, description: 'No tiene los permisos para realizar esta accion'})
  @ApiResponse({ status: 404, description: 'Usuario no encontrado'})
  async removeUser(@Param('id') id: string): Promise<User> {
    return await this.adminService.removeUser(id);
  }

  @Get('/posts')
  @ApiOperation({ summary: 'Ver listado de posts'})
  @ApiResponse({ status: 200, description: 'Listado detallado de posts'})
  @ApiResponse({ status: 401, description: 'No tiene los permisos para realizar esta accion'})
  async getPosts(): Promise<Posts[]> {
    return await this.adminService.getPosts();
  }

  @Put('/posts/:id')
  @ApiOperation({ summary: 'Actualizar'})
  @ApiResponse({ status: 200, description: 'Post actualizado con exito'})
  @ApiResponse({ status: 401, description: 'No tiene los permisos para realizar esta accion'})
  @ApiResponse({ status: 404, description: 'Post no encontrado'})
  async updatePost(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto
  ): Promise<Posts> {
    return await this.adminService.updatePost(id, updatePostDto);
  }

  @Delete('/posts/:id')
  @ApiOperation({ summary: 'Eliminar post'})
  @ApiResponse({ status: 200, description: 'Post eliminado con exito'})
  @ApiResponse({ status: 401, description: 'No tiene los permisos para realizar esta accion'})
  @ApiResponse({ status: 404, description: 'Post no encontrado'})
  async emovePost(@Param('id') id: string): Promise<Posts> {
    return await this.adminService.removePost(id);
  }
}
