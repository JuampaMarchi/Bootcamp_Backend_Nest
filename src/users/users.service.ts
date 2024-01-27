// Nest
import { Injectable, NotFoundException } from '@nestjs/common';
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
        const items = await this.userModel.find().lean();
        if(!items) throw new NotFoundException('Error al traer resultado de busqueda. Intente nuevamente.')
        return items
    }

    async findOne(id: string): Promise<User> {
        const item = await this.userModel.findOne({ _id: id} ).lean();
        if(!item) throw new NotFoundException('El parametro ingresado no es correcto')
        return item
    }

    async findByName(name: string): Promise<User> {
        const item = await this.userModel.findOne({ username: name} ).lean();
        if(!item) throw new NotFoundException('El parametro ingresado no es correcto')
        return item
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const item = await this.userModel.findOne({ _id: id} ).lean();
        if(!item) throw new NotFoundException('El parametro ingresado no es correcto')
        return await this.userModel.updateOne({ _id: id }, updateUserDto).lean();
    }
    async remove(id: string): Promise<User> {
        const item = await this.userModel.findOne({ _id: id} ).lean();
        if(!item) throw new NotFoundException('El parametro ingresado no es correcto')
        return await this.userModel.deleteOne({ _id: id}).lean();
    }
}
