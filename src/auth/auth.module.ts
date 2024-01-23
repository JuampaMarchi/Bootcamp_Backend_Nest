// Nest
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';

// Service
import { AuthService } from './auth.service';

// Strategies
import { LocalStrategy } from './strategies/local.strategy';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [PassportModule, UsersModule],
    providers: [AuthService, LocalStrategy, JwtService],
    exports: [AuthService]
})

export class AuthModule {}
