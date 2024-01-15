import { Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(): Array<Object> {
    return this.usersService.create()
  }
  
  @Get()
  getUsers(): Array<Object> {
    return this.usersService.findAll()
  }
  @Get()
  getById(): Array<Object> {
    return this.usersService.findAll()
  }
}
