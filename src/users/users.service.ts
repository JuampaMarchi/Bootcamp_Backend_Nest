// Nest
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// Mongoose
import { Model } from 'mongoose';

// Schema y Dto
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user';
import { UpdateUserDto } from './dto/update-user';

@Injectable()

export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User>{
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().lean();
    }

    async findOne(id: string): Promise<User> {
        return this.userModel.findOne({ _id: id} ).lean();
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        return this.userModel.updateOne({ _id: id }, updateUserDto).lean();
    }
    async remove(id: string): Promise<User> {
        return this.userModel.deleteOne({ _id: id}).lean();
    }
}
