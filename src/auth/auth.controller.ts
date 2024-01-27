// Nest
import { Controller, Request, Post, UseGuards } from "@nestjs/common";

// Service
import { AuthService } from "./auth.service";

// Guards
import { localAuthGuard } from "./guards/local-auth.guard";

@Controller('auth')

export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(localAuthGuard)
    @Post('login')
    async login(@Request() req) {
        console.log('user', req.user)
        return await this.authService.login(req.user)
    }
}