import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth/auth.guard';
import { jwtConstants } from 'src/auth/constants';
import { AuthController } from 'src/controller/auth.controller';
import { AuthService } from 'src/service/auth.service';
import { RoleService } from 'src/service/role.service';
import { PrismaService } from '../service/prisma.service';
import { UserModule } from './user.module';

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '3600s' },
        }),
    ],
    providers: [
        AuthService,
        PrismaService,
        RoleService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}
