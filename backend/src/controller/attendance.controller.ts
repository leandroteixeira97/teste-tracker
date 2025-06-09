import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { Attendance } from '@prisma/client';
import { AttendanceDTO } from 'src/model/dto/attendance.dto';
import { CreateAttendanceDTO } from 'src/model/dto/createAttendance.dto';
import { AttendanceService } from 'src/service/attendance.service';
import { Request } from './customer.controller';

@Controller('/attendances')
export class AttendanceController {
    constructor(private readonly attendanceService: AttendanceService) {}

    @Get(':userId')
    async getAttendancesByUserId(@Param('userId') userId: string): Promise<AttendanceDTO[]> {
        const attendances: Attendance[] = await this.attendanceService.getAttendancesByUserId(userId);

        return attendances.map((attendance: Attendance) => {
            return {
                id: attendance.id,
                description: attendance.description,
                createdAt: attendance.createdAt,
                customerId: attendance.customerId,
                userId: attendance.userId,
            };
        });
    }

    @Post()
    async createAttendance(@Body() postData: CreateAttendanceDTO, @Req() request: any): Promise<AttendanceDTO> {
        const userId: string | undefined = (request as Request)?.user.userId;

        const attendance: Attendance = await this.attendanceService.createAttendance(postData, userId);

        return {
            id: attendance.id,
            description: attendance.description,
            createdAt: attendance.createdAt,
            customerId: attendance.customerId,
            userId: attendance.userId,
        };
    }
}
