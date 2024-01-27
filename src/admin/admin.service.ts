// Nest
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// Mongoose
import { Model } from 'mongoose';

// Schema y Dto
import { User } from 'src/users/schemas/user.schema';
import { Post } from 'src/posts/schemas/posts.schema';
import { UpdatePostDto } from 'src/posts/dto/update-post';

@Injectable()
export class AdminService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(Post.name) private postModel: Model<Post>
    ) {};

    async getUsers(): Promise<User[]> {
        const users = await this.userModel.find().lean();
        if(!users) throw new NotFoundException('No se han encontrado resultados')
        return users;
    }

    async removeUser(id: string): Promise<User> {
        const user = await this.userModel.findOne({_id: id}).lean();
        if(!user) throw new NotFoundException('No se han encontrado resultados')
        return await this.userModel.findOneAndDelete({_id: id}).lean();
    }

    async getPosts(): Promise<Post[]> {
        const posts = await this.postModel.find().lean(); 
        if(!posts) throw new NotFoundException('No se han encontrado resultados')
        return posts;
    }

    async updatePost(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
        const post = await this.postModel.findOne({_id: id}).lean();
        if(!post) throw new NotFoundException('No se han encontrado resultados');
        return this.postModel.updateOne({_id: id}, updatePostDto).lean()
    }

    async removePost(id: string): Promise<Post> {
        const post = await this.postModel.findOne({_id: id}).lean();
        if(!post) throw new NotFoundException('No se han encontrado resultados');
        return await this.postModel.deleteOne({_id: id}).lean();
    }
}
