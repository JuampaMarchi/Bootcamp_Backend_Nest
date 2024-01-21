// Nest
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

// App
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Modules
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';

// Environment
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(configuration().mongo_atlas),
    UsersModule,
    PostsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
