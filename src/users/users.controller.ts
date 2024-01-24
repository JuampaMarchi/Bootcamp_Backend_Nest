// Nest
import { Controller, Get, Param, Post, Put, Body, Delete } from '@nestjs/common';

// Service
import { UsersService } from './users.service';

// Interfaces
import { User } from './interfaces/user';

// Dto
import { CreateUserDto } from './dto/create-user';
import { UpdateUserDto } from './dto/update-user';

// Middleware
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltOrRounds)
    createUserDto.password = hashedPassword
    return this.usersService.create(createUserDto);
  }
  
  @Put('/:id')
  updateUser(
      @Param('id') id: string,
      @Body() updateUserDto: UpdateUserDto
    ): Promise<User> {
    return this.usersService.update(id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<User> {
    return this.usersService.remove(id);
  }
}
