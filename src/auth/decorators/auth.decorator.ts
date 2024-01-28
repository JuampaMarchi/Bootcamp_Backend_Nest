// Nest
import { UseGuards, applyDecorators } from "@nestjs/common";

// Guard
import { RolesGuard } from "../guards/role.guard";

// Decorator
import { Roles } from "./roles.decorator";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";

export function Auth(roles: string) {

    return applyDecorators( Roles(roles), UseGuards(JwtAuthGuard, RolesGuard) );
}