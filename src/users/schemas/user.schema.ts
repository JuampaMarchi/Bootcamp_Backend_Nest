import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<Product>;

@Schema({ timestamps: true})
export class Product {
    
    @Prop({type: String, required: true})
    username: string;

    @Prop({type: String, required: true})
    name: string;

    @Prop({type: String, required: true})
    lastName: string;

    @Prop({type: String, required: true})
    email: string;

    @Prop({type: String, required: true})
    role: string;

    @Prop({type: Boolean, required: true})
    active: boolean;;
}

export const ProductSchema = SchemaFactory.createForClass(Product);