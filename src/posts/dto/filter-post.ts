import { ApiProperty } from "@nestjs/swagger";

export class FilterPostDto {

    @ApiProperty({type: String, required: false})
    readonly creatorId: string;

    @ApiProperty({type: [String], required: false})
    readonly category?: string[];
}