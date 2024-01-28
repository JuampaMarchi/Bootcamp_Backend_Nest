import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {

    @ApiProperty({type: String, required: true})
    readonly userId: string;

    @ApiProperty({type: String, required: false})
    readonly username?: string;
    
    @ApiProperty({type: String, required: false})
    readonly password?: string;

    @ApiProperty({type: String, required: false})
    readonly name?: string;

    @ApiProperty({type: String, required: false})
    readonly lastName?: string;

    @ApiProperty({type: String, required: false})
    readonly email?: string;

    @ApiProperty({type: String, required: false})
    readonly role?: string;

    @ApiProperty({type: Boolean, required: false})
    readonly active?: boolean;
}