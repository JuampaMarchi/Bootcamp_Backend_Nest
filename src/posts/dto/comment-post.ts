import { ApiProperty } from "@nestjs/swagger";

export class CommentPostDto {

        @ApiProperty({type: 'string'})
        readonly comment: string;

        @ApiProperty({type: 'string'})
        readonly commenterId: string;
}