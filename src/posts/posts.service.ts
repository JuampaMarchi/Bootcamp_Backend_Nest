// Nest
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// Mongoose
import { Model } from 'mongoose';

// Schema y Dto
import { Post } from './schemas/posts.schema';
import { CreatePostDto } from './dto/create-post';
import { UpdatePostDto } from './dto/update-post';

@Injectable()

export class PostsService {
    constructor(
        @InjectModel(Post.name) private postModel: Model<Post>,
    ) {}

    async create(createPostDto: CreatePostDto): Promise<Post> {
        const createdPost = new this.postModel(createPostDto);
        return createdPost.save();
    }

    async findAll(): Promise<Post[]> {
        return this.postModel.find().lean();
    }

    async findOne(id: string): Promise<Post> {
        return this.postModel.findOne({_id: id}).lean();
    }

    async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
        return this.postModel.updateOne({_id: id}, updatePostDto).lean();
    }

    async remove(id: string): Promise<Post> {
        return this.postModel.deleteOne({_id: id}).lean();
    }
}
