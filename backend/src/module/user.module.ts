import { Module } from '@nestjs/common';
import { UserController } from '../controller/user.controller';
import { UserService } from 'src/service/user.service';
import { PrismaService } from 'src/service/prisma.service';

@Module({
    controllers: [UserController],
    providers: [UserService, PrismaService],
})
export class UserModule {}
