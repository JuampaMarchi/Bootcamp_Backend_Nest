import { ApiProperty } from "@nestjs/swagger";

export class CommentPostDto {

        @ApiProperty({type: String})
        readonly comment: string;

        @ApiProperty({type: String})
        readonly commenterId: string;
}