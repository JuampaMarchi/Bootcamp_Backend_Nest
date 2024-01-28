// Nest
import { Controller, Get, Param, Post, Put, Body, Delete, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

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
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltOrRounds)
    createUserDto.password = hashedPassword
   return await this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(@Request() req): Promise<User[]> {
   return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.usersService.findOne(id);
  }
  
  @Put('/:id')
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
  @Auth('admin')
  remove(@Param('id') id: string): Promise<User> {
    return this.usersService.remove(id);
  }
}
