import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type PostDocument = HydratedDocument<Post>

@Schema({timestamps: true})

export class Post {

    @Prop({type: String, required: true})
    post: string

    @Prop({type: String, required: true})
    creatorId: string

    @Prop({type: Number, default: 0})
    likes: number

    @Prop({type: Array<Object>, default: []})
    comments: [
        {
            comment: string,
            commenterId: string,
            likes: number,
        }
    ]

}

export const PostSchema = SchemaFactory.createForClass(Post)