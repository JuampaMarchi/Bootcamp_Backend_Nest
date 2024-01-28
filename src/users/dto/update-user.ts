import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {

    @ApiProperty({type: 'string'})
    readonly userId: string;

    @ApiProperty({type: 'string'})
    readonly username?: string;
    
    @ApiProperty({type: 'string'})
    readonly password?: string;

    @ApiProperty({type: 'string'})
    readonly name?: string;

    @ApiProperty({type: 'string'})
    readonly lastName?: string;

    @ApiProperty({type: 'string'})
    readonly email?: string;

    @ApiProperty({type: 'string'})
    readonly role?: string;

    @ApiProperty({type: 'boolean'})
    readonly active?: boolean;
}