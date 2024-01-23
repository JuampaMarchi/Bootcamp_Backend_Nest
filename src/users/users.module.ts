// Nest Modules
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Service
import { UsersService } from './users.service';

// Controller
import { UsersController } from './users.controller';

//Schemas
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}])
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})

export class UsersModule {}
