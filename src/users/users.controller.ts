// Nest
import { Controller, Get, Param, Post, Put, Body, Delete, Request, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

// Service
import { UsersService } from './users.service';

// Interfaces
import { User } from './interfaces/user';

// Dto
import { CreateUserDto } from './dto/create-user';
import { UpdateUserDto } from './dto/update-user';

// Middleware
import * as bcrypt from 'bcrypt';

// Auth
import { Auth } from 'src/auth/decorators/auth.decorator';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @Post()
  @ApiOperation({ summary: 'Crear usuario'})
  @ApiResponse({ status: 200, description: 'Usuario creado con exito'})
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltOrRounds)
    createUserDto.password = hashedPassword
   return await this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Ver listado de usuarios'})
  @ApiResponse({ status: 200, description: 'Listado detallado de usuarios'})
  async findAll(@Request() req): Promise<User[]> {
   return await this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Ver detalle de usuario'})
  @ApiResponse({ status: 200, description: 'Detalle de usuarios'})
  @ApiResponse({ status: 404, description: 'Usuario no encontrado'})
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.usersService.findOne(id);
  }
  
  @Put('/:id')
  @ApiOperation({ summary: 'Actualizar usuario. Solo para propio usuario o admin'})
  @ApiResponse({ status: 200, description: 'Usuario actualizado con exito'})
  @ApiResponse({ status: 401, description: 'No tiene los permisos para realizar esta accion'})
  @ApiResponse({ status: 403, description: 'No tiene los permisos para realizar esta accion'})
  @ApiResponse({ status: 404, description: 'Usuario no encontrado'})
  @ApiBearerAuth()
  @Auth('user')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req
  ): Promise<User> {
    if(req.user.id === updateUserDto.userId || req.user.role === 'admin') return this.usersService.update(req.user.id, updateUserDto)
    throw new UnauthorizedException('No tiene los permisos requiros para realizar esta tarea')
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar usuario. Solo para admins'})
  @ApiResponse({ status: 200, description: 'Usuario eliminado con exito'})
  @ApiResponse({ status: 401, description: 'No tiene los permisos para realizar esta accion'})
  @ApiResponse({ status: 403, description: 'No tiene los permisos para realizar esta accion'})
  @ApiBearerAuth()
  @ApiResponse({ status: 404, description: 'Usuario no encontrado'})
  @Auth('admin')
  remove(@Param('id') id: string): Promise<User> {
    return this.usersService.remove(id);
  }
}
