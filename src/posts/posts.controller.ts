// Nest
import { Controller, Get, Post, Put, Delete, Body, Param , Request, Query, UnauthorizedException} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

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
import { FilterPostDto } from './dto/filter-post';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/search')
  @ApiOperation({ summary: 'Busca posteos segun criterio de busqueda, por titulo o contenido. Acepta parametros "page" y "size" para paginar resultados'})
  @ApiResponse({ status: 200, description: 'Listado de posteos'})
  async searchPosts(
    @Body() query: Record<string, any>,
    @Query('page') page: number,
    @Query('size') size: number
  ): Promise<Posts> {
    return await this.postsService.searchPosts(query, page || 1, size || 10);
  }

  @Get('/filter')
  @ApiOperation({ summary: 'Filtra posts segun autor o categorias'})
  @ApiResponse({ status: 200, description: 'Listaod de posteos'})
  async searchByCategoryOrAuthor(
    @Body() querie: FilterPostDto
  ): Promise<Posts[]> {
    const searchQuerie = querie
    if(searchQuerie.creatorId) return this.postsService.findAllById(searchQuerie.creatorId);
    return await this.postsService.searchByCategory(searchQuerie);
  }

  @Get()
  @ApiOperation({ summary: 'Ver todos los posts. Acepta parametros "page" y "size" para paginar resultados'})
  @ApiResponse({ status: 200, description: 'Listado de posts'})
  async findAll(
    @Query('page') page: number,
    @Query('size') size: number
  ): Promise<Posts[]> {
    return this.postsService.findAll(page || 1, size || 10);
  }

  @Post()
  @ApiOperation({ summary: 'Crear post. Solo usuarios registrados'})
  @ApiResponse({ status: 200, description: 'Post creado con exito'})
  @ApiResponse({ status: 401, description: 'No tiene los permisos para realizar esta accion'})
  @ApiBearerAuth()
  @Auth('user')
  async create(@Body() createPostDto: CreatePostDto, @Request() req): Promise<Posts> {
    console.log('req.user', req.user)
    return this.postsService.create(createPostDto);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Ver detalle de post'})
  @ApiResponse({ status: 200, description: 'Detalle de post'})
  @ApiResponse({ status: 404, description: 'Post no encontrado'})
  async findOne(@Param('id') id: string): Promise<Posts> {
    return this.postsService.findOne(id);
  }

  @Get('/user/:id')
  @ApiOperation({ summary: 'Ver posts de usuario especificado'})
  @ApiResponse({ status: 200, description: 'Listado de posts de usuario'})
  @ApiResponse({ status: 404, description: 'Usuario no encontrado'})
  async userPosts(
    @Param('id') id: string
  ): Promise<Posts[]> {
    return this.postsService.findAllById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar post. Solo usuario creador o admin'})
  @ApiResponse({ status: 200, description: 'Post actualizado con exito'})
  @ApiResponse({ status: 401, description: 'No tiene los permisos para realizar esta accion'})
  @ApiResponse({ status: 403, description: 'No tiene los permisos para realizar esta accion'})
  @ApiResponse({ status: 404, description: 'Post no encontrado'})
  @ApiBearerAuth()
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
  @ApiOperation({ summary: 'Comentar post. Solo usuarios registrados'})
  @ApiResponse({ status: 200, description: 'Comentario realizado con exito'})
  @ApiResponse({ status: 401, description: 'No tiene los permisos para realizar esta accion'})
  @ApiResponse({ status: 404, description: 'Post no encontrado'})
  @ApiBearerAuth()
  @Auth('user')
  async insertComment(
    @Param('id') id: string,
    @Body() commentPostDto: CommentPostDto
  ): Promise<Posts> {
    return this.postsService.insertComment(id, commentPostDto);
  }

  @Put('/del-comment/:id')
  @ApiOperation({ summary: 'Eliminar comentario. Solo admins'})
  @ApiResponse({ status: 200, description: 'Comentario eliminado con exito'})
  @ApiResponse({ status: 401, description: 'No tiene los permisos para realizar esta accion'})
  @ApiResponse({ status: 403, description: 'No tiene los permisos para realizar esta accion'})
  @ApiResponse({ status: 404, description: 'Comentario no encontrado'})
  @ApiBearerAuth()
  @Auth('admin')
  async removeComment(
    @Param('id') id: string): Promise<Posts> {
    return this.postsService.removeComment(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar post. Solo usuario creador o admin'})
  @ApiResponse({ status: 200, description: 'Post actualizado con exito'})
  @ApiResponse({ status: 401, description: 'No tiene los permisos para realizar esta accion'})
  @ApiResponse({ status: 403, description: 'No tiene los permisos para realizar esta accion'})
  @ApiResponse({ status: 404, description: 'Post no encontrado'})
  @ApiBearerAuth()
  @Auth('user')
  async remove(
    @Param('id') id: string,
    @Request() req
  ): Promise<Posts> {
    const post = await this.postsService.findOne(id)
    if(req.user.id === post.creatorId || req.user.role === 'admin') return this.postsService.remove(id);
  }
}
