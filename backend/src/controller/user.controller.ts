import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from 'generated/prisma';

import { CreateUserDTO } from 'src/model/dto/createUser.dto';
import { UserDTO } from 'src/model/dto/user.dto';
import { UserService } from 'src/service/user.service';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    const users: User[] = await this.userService.getAllUsers();
    return users;
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
