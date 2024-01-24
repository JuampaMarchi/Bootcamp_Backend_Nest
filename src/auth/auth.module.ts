// Nest
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

// Service
import { AuthService } from './auth.service';

// Strategies
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [
        PassportModule,
        UsersModule,
        JwtModule.register({
            secret: 'la-palabra-secreta',
            signOptions: { expiresIn: '20s'}
        })
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService]
})

export class AuthModule {}
