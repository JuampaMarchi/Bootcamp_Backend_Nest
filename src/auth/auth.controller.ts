// Nest
import { Controller, Request, Post, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

// Service
import { AuthService } from "./auth.service";

// Guards
import { localAuthGuard } from "./guards/local-auth.guard";

@ApiTags('Auth')
@Controller('auth')

export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(localAuthGuard)
    @Post('login')
    @ApiOperation({ summary: 'Logueo de usuarios registrados'})
    @ApiResponse({ status: 200, description: 'Retorna acces_token'})
    @ApiResponse({ status: 401, description: 'Usuario y/o contraseña incorrectos'})
    async login(@Request() req) {
        return await this.authService.login(req.user)
    }
}