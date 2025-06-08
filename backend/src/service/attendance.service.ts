import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Attendance } from 'generated/prisma';
import { CreateAttendanceDTO } from 'src/model/dto/createAttendance.dto';

@Injectable()
export class AttendanceService {
    constructor(private readonly prisma: PrismaService) {}

    public async getAttendancesByUserId(userId: string): Promise<Attendance[]> {
        return await this.prisma.attendance.findMany({ where: { userId: userId } });
    }

    public async getAttendancesByCustomerId(customerId: string): Promise<Attendance[]> {
        return await this.prisma.attendance.findMany({ where: { customerId: customerId } });
    }

    public async createAttendance(createAttendanceDTO: CreateAttendanceDTO, userId: string): Promise<Attendance> {
        return await this.prisma.attendance.create({
            data: {
                ...createAttendanceDTO,
                userId: userId,
            },
        });
    }
}
