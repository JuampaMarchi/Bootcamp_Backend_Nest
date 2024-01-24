// Nest
import { Injectable } from "@nestjs/common";

// User Interface
import { User } from "./interfaces/user";

// Services
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";

// Middleware
import * as bcrypt from 'bcrypt';

@Injectable()

export class AuthService {
    
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(username: string, password: string): Promise<User> {
        const user = await this.userService.findByName(username)
        const validPassword = await bcrypt.compare(password, user.password)
        if (user && validPassword) {
            return {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            };
        }
        return null
    }

    async login(user: User) {
        const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        };

        return {
            acces_token: this.jwtService.sign(payload)
        };
    }
}