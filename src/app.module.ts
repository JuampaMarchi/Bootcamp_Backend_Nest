// Nest
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

// App
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';

// Modules
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';

// Environment
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(configuration().mongo_atlas),
    UsersModule,
    PostsModule,
    AuthModule
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
