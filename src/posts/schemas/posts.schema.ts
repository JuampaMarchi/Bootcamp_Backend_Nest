import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type PostDocument = HydratedDocument<Post>

@Schema({timestamps: true})

export class Post {

    @Prop({type: String, required: true})
    post: string

    @Prop({type: String, required: true})
    creatorId: string

    @Prop({type: Number, required: true})
    likes: number

    @Prop({type: Object, required: true})
    comments: {
        comment: string,
        commenterId: string,
        likes: number,
    }

}

export const PostSchema = SchemaFactory.createForClass(Post)