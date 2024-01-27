// Nest
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// Mongoose
import { FilterQuery, Model } from 'mongoose';

// Schema y Dto
import { Post } from './schemas/posts.schema';
import { CreatePostDto } from './dto/create-post';
import { UpdatePostDto } from './dto/update-post';
import { CommentPostDto } from './dto/comment-post';
import { title } from 'process';

@Injectable()

export class PostsService {
    constructor(
        @InjectModel(Post.name) private postModel: Model<Post>,
    ) {}

    async searchPosts(query: Record<string, any>, pageQuery: number, sizeQuery: number): Promise<Post> {
        let search = null
        if(query.title) {
            search = await this.postModel.find({title: {$regex: query.title, $options: 'i'}}).skip((pageQuery - 1) * sizeQuery).limit(sizeQuery).lean();
            return search
        }
        if(query.content) {
            search = await this.postModel.find({content: {$regex: query.content, $options: 'i'}}).skip((pageQuery - 1) * sizeQuery).limit(sizeQuery).lean();
            return search
        }
        throw new NotFoundException()
    }

    async create(createPostDto: CreatePostDto): Promise<Post> {
        const createdPost = new this.postModel(createPostDto);
        return await createdPost.save();
    }

    async findAll(pageQuery: number, sizeQuery: number): Promise<Post[]> {
        return await this.postModel.find().skip((pageQuery - 1) * sizeQuery).limit(sizeQuery).lean();
    }

    async findAllById(id: string): Promise<Post[]> {
        return await this.postModel.find({creatorId: id}).lean();
    }

    async findOne(id: string): Promise<Post> {
        return this.postModel.findOne({_id: id}).lean();
    }
    
    async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
        return await this.postModel.updateOne({_id: id}, updatePostDto).lean();
    }

    async insertComment(id: string, commentPostDto: CommentPostDto): Promise<Post> {
        return await this.postModel.updateOne({_id: id}, { $push: {comments: commentPostDto}},).lean();
    }

    async removeComment(id: string): Promise<Post> {
        return await this.postModel.updateOne({_id: id}, { $pop: {comments: 1}},).lean();
    }    

    async remove(id: string): Promise<Post> {
        return await this.postModel.deleteOne({_id: id}).lean();
    }
}
