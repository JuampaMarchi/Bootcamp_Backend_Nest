import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type PostDocument = HydratedDocument<Post>

@Schema({timestamps: true})

export class Post {

    @Prop({type: String, required: true})
    title: string

    @Prop({type: String, required: true})
    content: string

    @Prop({type: String, required: true})
    author: string

    @Prop({type: String, required: true})
    creatorId: string

    @Prop({type: Array<String>, default: 0})
    category: string[]

    @Prop({type: Array<Object>, default: []})
    comments: [
        {
            comment: string,
            commenterId: string
        }
    ]

}

export const PostSchema = SchemaFactory.createForClass(Post)