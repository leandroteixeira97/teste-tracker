import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Role, User } from 'generated/prisma';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) {}

    async login(email: string, passwordHash: string): Promise<LoginResponse> {
        const user: User | null = await this.prisma.user.findUnique({
            where: { email: email },
        });

        if (!user) {
            throw new NotFoundException('User not found!');
        }

        if (user?.passwordHash !== passwordHash) {
            throw new UnauthorizedException();
        }

        const payload: Payload = { userId: user.id, email: user.email, role: user.role };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}

export interface Payload {
    userId: string;
    email: string;
    role: Role;
}

export interface LoginResponse {
    access_token: string;
}
