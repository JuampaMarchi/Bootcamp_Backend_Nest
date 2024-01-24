// Nest
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";

// Passport
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'la-palabra-secreta'
        });
    }

    async validation(payload: any) {
        return {
            id: payload.id,
            username: payload.username,
            email: payload.email,
            role: payload.role
        };
    }
}

