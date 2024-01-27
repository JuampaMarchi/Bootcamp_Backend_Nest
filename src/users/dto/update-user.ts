export class UpdateUserDto {
    readonly userId: string;
    readonly username?: string;
    readonly password?: string;
    readonly name?: string;
    readonly lastName?: string;
    readonly email?: string;
    readonly role?: string;
    readonly active?: boolean;
}