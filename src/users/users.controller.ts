import { Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser( @Req() req: Request): Object {
    return this.usersService.create(req.body)
  }
  
  @Get()
  getUsers(): Array<Object> {
    return this.usersService.findAll()
  }
  @Get('/:id')
  getById( @Param('id') id: String ): Array<Object> {
    return this.usersService.findOne(id)
  }
  @Put('/:id')
  updateUser(
      @Param('id') id: String,
      @Req() request: Request
    ): Object {
    return this.usersService.update(id, request.body)
  }
}
