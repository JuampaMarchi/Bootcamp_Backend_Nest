// Nest
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

// Passport
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('jwt_secret')
        });
    }

    validate(payload: any) {
        return {
            id: payload.id,
            username: payload.username,
            email: payload.email,
            role: payload.role
        };
    }
}

