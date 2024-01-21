// Modules
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Service
import { UsersService } from './users.service';

// Controller
import { UsersController } from './users.controller';

//Schemas
import { Product, ProductSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Product.name, schema: ProductSchema}])
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
