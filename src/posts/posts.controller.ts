import { Controller, Get, Post } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  createPost(): Array<Object> {
    return this.postsService.create()
  }
  
  @Get()
  getPosts(): Array<Object> {
    return this.postsService.findAll()
  }
  @Get()
  getById(): Array<Object> {
    return this.postsService.findAll()
  }
}
