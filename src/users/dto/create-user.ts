// Swagger
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({type: 'string'})
    readonly username: string;

    @ApiProperty({type: 'string'})
    password: string;

    @ApiProperty({type: 'string'})
    readonly name: string;

    @ApiProperty({type: 'string'})
    readonly lastName: string;

    @ApiProperty({type: 'string'})
    readonly email: string;

    @ApiProperty({type: 'string'})
    readonly role: string;

    @ApiProperty({type: 'boolean'})
    readonly active: boolean;
}