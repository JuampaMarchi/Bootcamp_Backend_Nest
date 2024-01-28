import { ApiProperty } from "@nestjs/swagger";

export class UpdatePostDto {

    @ApiProperty({type: 'string'})
    readonly title?: string;

    @ApiProperty({type: 'string'})
    readonly content?: string;

    @ApiProperty({type: 'string'})
    readonly author?: string;

    @ApiProperty({type: 'string'})
    readonly creatorId: string;

    @ApiProperty({type: 'array', items: {type: 'string'}})
    readonly category?: string[];

    @ApiProperty({type: 'array', items: {type: 'object', items: {type: 'string'}}})
    readonly comments?: [
        {
            comment?: string,
            commenterId?: string
        }
    ];
}