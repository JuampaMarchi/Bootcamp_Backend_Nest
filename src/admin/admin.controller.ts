// Nest
import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';

// Service
import { AdminService } from './admin.service';

// Interfaces
import { User } from 'src/users/interfaces/user';
import { Posts } from 'src/posts/interfaces/post';

// Dto
import { UpdatePostDto } from 'src/posts/dto/update-post';

// Auth
import { Auth } from 'src/auth/decorators/auth.decorator';

@Auth('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return await this.adminService.getUsers();
  }

  @Delete()
  async removeUser(@Param('id') id: string): Promise<User> {
    return await this.adminService.removeUser(id);
  }

  @Get()
  async getPosts(): Promise<Posts[]> {
    return await this.adminService.getPosts();
  }

  @Put()
  async updatePost(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto
  ): Promise<Posts> {
    return await this.adminService.updatePost(id, updatePostDto);
  }

  @Delete()
  async emovePost(@Param('id') id: string): Promise<Posts> {
    return await this.adminService.removePost(id);
  }
}
