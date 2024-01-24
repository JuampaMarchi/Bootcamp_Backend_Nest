export class CreateUserDto {
    readonly username: string;
    password: string;
    readonly name: string;
    readonly lastName: string;
    readonly email: string;
    readonly role: string;
    readonly active: boolean;
}