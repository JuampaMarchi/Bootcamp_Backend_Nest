// Nest
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Service
import { AdminService } from './admin.service';

// Controller
import { AdminController } from './admin.controller';

// Schemas
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { Post, PostSchema } from 'src/posts/schemas/posts.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Post.name, schema: PostSchema}, {name: User.name, schema: UserSchema}])
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
