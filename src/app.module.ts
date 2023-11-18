import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(configuration().mongo_atlas)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
