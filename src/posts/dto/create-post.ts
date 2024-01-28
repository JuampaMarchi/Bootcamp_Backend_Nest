import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDto {

    @ApiProperty({type: String, required: true})
    readonly title: string;

    @ApiProperty({type: String, required: true})
    readonly content: string;

    @ApiProperty({type: String, required: true})
    readonly author: string;

    @ApiProperty({type: String, required: true})
    readonly creatorId: string;

    @ApiProperty({type: [String], required: true})
    readonly category: string[];
}