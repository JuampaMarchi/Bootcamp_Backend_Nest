// Nest
import { Controller, Request, Post, UseGuards } from "@nestjs/common";

// Guards
import { localAuthGuard } from "./guards/local-auth.guard";

@Controller('auth')

export class AuthController {
    constructor() {}

    @UseGuards(localAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return req.user;
    }
}