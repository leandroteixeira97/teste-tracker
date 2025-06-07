import { BadRequestException, Body, Controller, Get, NotFoundException, Post, Req } from '@nestjs/common';
import { User } from 'generated/prisma';

import { CreateUserDTO } from 'src/model/dto/createUser.dto';
import { UserDTO } from 'src/model/dto/user.dto';
import { UserService } from 'src/service/user.service';
import { Request } from './customer.controller';

@Controller('/users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getAllUsers(): Promise<User[]> {
        const users: User[] = await this.userService.getAllUsers();
        return users;
    }

    @Get('/current')
    async getCurrentUser(@Req() request: Request) {
        const userId: string | undefined = request?.user.userId;

        if (!userId) throw new BadRequestException('No user id is present in the request');

        const user: User | null = await this.userService.getUserById(userId);

        if (!user) throw new NotFoundException('No user was found');

        return {
            id: user.id,
            name: user.name,
            role: user.role,
            createdAt: user.createdAt,
        };
    }

    @Post()
    async createUser(@Body() postData: CreateUserDTO): Promise<UserDTO> {
        const user: User = await this.userService.createUser(postData);

        return {
            id: user.id,
            name: user.name,
            role: user.role,
            createdAt: user.createdAt,
        };
    }
}
