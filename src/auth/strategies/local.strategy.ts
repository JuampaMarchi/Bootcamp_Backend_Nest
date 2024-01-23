// Nest
import { Injectable, UnauthorizedException } from "@nestjs/common";

// Strategies
import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";

// Service
import { AuthService } from "../auth.service";

// Interface
import { User } from "../interfaces/user";

@Injectable()

export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({usernameField: 'username'});
    }

    async validate(username: string, password: string): Promise<User> {
        const user = await this.authService.validateUser(username, password);
        if(!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}