// Nest Modules
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Service
import { PostsService } from './posts.service';

// Controller
import { PostsController } from './posts.controller';

// Schemas
import { Post, PostSchema } from './schemas/posts.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Post.name, schema: PostSchema}])
  ],
  controllers: [PostsController],
  providers: [PostsService],
})

export class PostsModule {}
