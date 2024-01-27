// Nest
import { Controller, Get, Post, Put, Delete, Body, Param , Request, Query, UnauthorizedException} from '@nestjs/common';

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


@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/search')
  async searchPosts(
    @Body() query: Record<string, any>,
    @Query('page') page: number,
    @Query('size') size: number
  ): Promise<Posts> {
    console.log('query', query)
    return await this.postsService.searchPosts(query, page || 1, size || 10);
  }

  @Post()
  @Auth('user')
  async create(@Body() createPostDto: CreatePostDto): Promise<Posts> {
    return this.postsService.create(createPostDto);
  }

  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('size') size: number
  ): Promise<Posts[]> {
    return this.postsService.findAll(page || 1, size || 10);
  }

  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<Posts> {
    return this.postsService.findOne(id);
  }

  @Get('/user/:id')
  async userPosts(
    @Param('id') id: string
  ): Promise<Posts[]> {
    return this.postsService.findAllById(id);
  }

  @Put(':id')
  @Auth('user')
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Request() req
  ): Promise<Posts> {
    if(req.user.id === updatePostDto.creatorId || req.user.role === 'admin') return this.postsService.update(id, updatePostDto);

    throw new UnauthorizedException('Forbidden Resource')
  }

  @Put('/comment/:id')
  @Auth('user')
  async insertComment(
    @Param('id') id: string,
    @Body() commentPostDto: CommentPostDto
  ): Promise<Posts> {
    return this.postsService.insertComment(id, commentPostDto);
  }

  @Put('/del-comment/:id')
  @Auth('admin')
  async removeComment(
    @Param('id') id: string): Promise<Posts> {
    return this.postsService.removeComment(id);
  }

  @Delete(':id')
  @Auth('user')
  async remove(
    @Param('id') id: string,
    @Request() req
  ): Promise<Posts> {
    const post = await this.postsService.findOne(id)
    if(req.user.id === post.creatorId || req.user.role === 'admin') return this.postsService.remove(id);
  }
}
