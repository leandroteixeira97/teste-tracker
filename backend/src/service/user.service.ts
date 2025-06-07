import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateUserDTO } from 'src/model/dto/createUser.dto';
import { User } from 'generated/prisma';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async getAllUsers(): Promise<User[]> {
        return await this.prisma.user.findMany();
    }

    async createUser(createUserDTO: CreateUserDTO): Promise<User> {
        return await this.prisma.user.create({ data: { ...createUserDTO } });
    }

    async getUserById(userId: string): Promise<User | null> {
        return await this.prisma.user.findUnique({ where: { id: userId } });
    }
}
