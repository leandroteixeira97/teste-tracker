import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorator/public';
import { IS_ROLE_PROTECTED } from '../decorator/roleprotected';
import { RoleService } from 'src/service/role.service';
import { UserInformation } from 'src/service/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector,
        private roleService: RoleService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);

        if (isPublic) {
            return true;
        }

        const request: Request = context.switchToHttp().getRequest();
        const token: string | undefined = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException();
        }

        let userInformation: UserInformation;

        try {
            userInformation = await this.jwtService.verifyAsync(token, {
                secret: jwtConstants.secret,
            });

            request['user'] = userInformation;
        } catch {
            throw new UnauthorizedException();
        }

        const isRoleProtected = this.reflector.getAllAndOverride<boolean>(IS_ROLE_PROTECTED, [context.getHandler(), context.getClass()]);

        if (isRoleProtected) {
            return this.handleRoleProtection(userInformation);
        }

        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

    private handleRoleProtection(userInformation: UserInformation): boolean {
        return this.roleService.isAdminRole(userInformation['role']);
    }
}
