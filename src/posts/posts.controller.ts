// Nest
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';

// Service
import { PostsService } from './posts.service';

// Interfaces
import { Posts } from './interfaces/post';

// Dto
import { CreatePostDto } from './dto/create-post';
import { UpdatePostDto } from './dto/update-post';
import { CommentPostDto } from './dto/comment-post';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll(): Promise<Posts[]> {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Posts> {
    return this.postsService.findOne(id);
  }

  @Post()
  create(@Body() createPostDto: CreatePostDto): Promise<Posts> {
    return this.postsService.create(createPostDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto
  ): Promise<Posts> {
    return this.postsService.update(id, updatePostDto);
  }

  @Put('/comment/:id')
  insertComment(
    @Param('id') id: string,
    @Body() commentPostDto: CommentPostDto
  ): Promise<Posts> {
    console.log("body", commentPostDto)
    return this.postsService.insertComment(id, commentPostDto);
  }

  @Put('/del-comment/:id')
  removeComment(
    @Param('id') id: string): Promise<Posts> {
    return this.postsService.removeComment(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Posts> {
    return this.postsService.remove(id);
  }
}
