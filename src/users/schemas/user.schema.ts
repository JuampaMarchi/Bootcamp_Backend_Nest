import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true})
export class User {

    @Prop({type: String, required: true})
    username: string;

    @Prop({type: String, required: true})
    name: string;

    @Prop({type: String, required: true})
    lastName: string;

    @Prop({type: String, required: true})
    email: string;

    @Prop({type: String, default: 'user'})
    role: string;

    @Prop({type: Boolean, default: true})
    active: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);