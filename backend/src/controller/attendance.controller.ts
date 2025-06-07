import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Attendance } from 'generated/prisma';
import { AttendanceDTO } from 'src/model/dto/attendance.dto';
import { CreateAttendanceDTO } from 'src/model/dto/createAttendance.dto';
import { AttendanceService } from 'src/service/attendance.service';

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
    async createAttendance(@Body() postData: CreateAttendanceDTO): Promise<AttendanceDTO> {
        const userId: string = '42d8829a-e036-4ae4-b319-ce7e3559afc2';
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
