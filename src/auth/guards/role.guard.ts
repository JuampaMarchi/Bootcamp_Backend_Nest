// Nest
import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()

export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {

        const role = this.reflector.getAllAndOverride('role', [context.getHandler(), context.getClass]);

        if(!role) return false;

        const { user } = context.switchToHttp().getRequest();

        if(user.role === 'admin') return true

        return role === user.role
    }
}