// Swagger
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({type: String, required: true})
    readonly username: string;

    @ApiProperty({type: String, required: true})
    password: string;

    @ApiProperty({type: String, required: true})
    readonly name: string;

    @ApiProperty({type: String, required: true})
    readonly lastName: string;

    @ApiProperty({type: String, required: true})
    readonly email: string;
}