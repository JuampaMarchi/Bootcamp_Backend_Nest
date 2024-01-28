import { ApiProperty } from "@nestjs/swagger";

export class UpdatePostDto {

    @ApiProperty({type: String, required: false})
    readonly title?: string;

    @ApiProperty({type: String, required: false})
    readonly content?: string;

    @ApiProperty({type: String, required: false})
    readonly author?: string;

    @ApiProperty({type: String, required: false})
    readonly creatorId: string;

    @ApiProperty({type: [String], required: false})
    readonly category?: string[];

    @ApiProperty({type: Array, items: {type: 'object', items: {type: 'string'}}, required: false})
    readonly comments?: [
        {
            comment?: string,
            commenterId?: string
        }
    ];
}