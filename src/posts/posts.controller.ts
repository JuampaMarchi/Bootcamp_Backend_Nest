// Nest
import { Controller, Get, Post, Put, Delete, Body, Param , Request, Query} from '@nestjs/common';

// Service
import { PostsService } from './posts.service';

// Interfaces
import { Posts } from './interfaces/post';

// Auth
import { Auth } from 'src/auth/decorators/auth.decorator';

// Dto
import { CreatePostDto } from './dto/create-post';
import { UpdatePostDto } from './dto/update-post';
import { CommentPostDto } from './dto/comment-post';

//@Auth('user')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('user-posts')
  userPosts(@Request() req): Promise<Posts[]> {
    return this.postsService.findAllById(req.user.id)
  }
  
  @Post()
  create(@Body() createPostDto: CreatePostDto): Promise<Posts> {
    return this.postsService.create(createPostDto);
  }

  @Get()
  //@Auth('admin')
  findAll(
    @Query('page') page: number,
    @Query('size') size: number
  ): Promise<Posts[]> {
    return this.postsService.findAll(page || 1, size || 10);
  }

  @Get(':id')
  @Auth('admin')
  findOne(@Param('id') id: string): Promise<Posts> {
    return this.postsService.findOne(id);
  }

  @Put(':id')
  @Auth('admin')
  update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto
  ): Promise<Posts> {
    return this.postsService.update(id, updatePostDto);
  }

  @Put('/comment/:id')
  @Auth('admin')
  insertComment(
    @Param('id') id: string,
    @Body() commentPostDto: CommentPostDto
  ): Promise<Posts> {
    console.log("body", commentPostDto)
    return this.postsService.insertComment(id, commentPostDto);
  }

  @Put('/del-comment/:id')
  @Auth('admin')
  removeComment(
    @Param('id') id: string): Promise<Posts> {
    return this.postsService.removeComment(id);
  }

  @Delete(':id')
  @Auth('admin')
  remove(@Param('id') id: string): Promise<Posts> {
    return this.postsService.remove(id);
  }
}
