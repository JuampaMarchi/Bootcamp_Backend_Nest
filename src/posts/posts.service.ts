// Nest
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// Mongoose
import { Model } from 'mongoose';

// Schema y Dto
import { Post } from './schemas/posts.schema';
import { CreatePostDto } from './dto/create-post';
import { UpdatePostDto } from './dto/update-post';
import { CommentPostDto } from './dto/comment-post';

@Injectable()

export class PostsService {
    constructor(
        @InjectModel(Post.name) private postModel: Model<Post>,
    ) {}

    async create(createPostDto: CreatePostDto): Promise<Post> {
        const createdPost = new this.postModel(createPostDto);
        return createdPost.save();
    }

    async findAll(pageQuery: number, sizeQuery: number): Promise<Post[]> {
        const page = pageQuery
        const size = sizeQuery
        return this.postModel.find().skip((page - 1) * size).limit(size).lean();
    }

    async findAllById(id: string): Promise<Post[]> {
        return this.postModel.find({creatorId: id}).lean();
    }

    async findOne(id: string): Promise<Post> {
        return this.postModel.findOne({_id: id}).lean();
    }

    async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
        return this.postModel.updateOne({_id: id}, updatePostDto).lean();
    }

    async insertComment(id: string, commentPostDto: CommentPostDto): Promise<Post> {
        return this.postModel.updateOne({_id: id}, { $push: {comments: commentPostDto}},).lean();
    }

    async removeComment(id: string): Promise<Post> {
        return this.postModel.updateOne({_id: id}, { $pop: {comments: 1}},).lean();
    }    

    async remove(id: string): Promise<Post> {
        return this.postModel.deleteOne({_id: id}).lean();
    }
}
