import { Module } from '@nestjs/common';
import { AttendanceController } from 'src/controller/attendance.controller';
import { AttendanceService } from 'src/service/attendance.service';
import { PrismaService } from 'src/service/prisma.service';

@Module({
    controllers: [AttendanceController],
    providers: [AttendanceService, PrismaService],
})
export class AttendanceModule {}
