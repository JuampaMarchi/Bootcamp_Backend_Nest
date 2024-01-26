// Nest
import { Controller, Get, Param, Post, Put, Body, Delete, Request } from '@nestjs/common';

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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
   @Post()
   async create(@Body() createUserDto: CreateUserDto): Promise<User> {
     const saltOrRounds = 10;
     const hashedPassword = await bcrypt.hash(createUserDto.password, saltOrRounds)
     createUserDto.password = hashedPassword
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Auth('user')
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Auth('user')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }
  
  @Put('/:id')
  @Auth('user')
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req
  ): Promise<User> {
    if(req.user.role === 'user') return this.usersService.update(req.user.id, updateUserDto)
    
    return this.usersService.update(id, updateUserDto)
  }

  @Delete(':id')
  @Auth('admin')
  remove(@Param('id') id: string): Promise<User> {
    return this.usersService.remove(id);
  }
}
