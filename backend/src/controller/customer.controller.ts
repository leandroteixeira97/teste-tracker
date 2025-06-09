import { BadRequestException, Body, Controller, Get, NotFoundException, Param, Post, Req } from '@nestjs/common';
import { Attendance, Customer } from '@prisma/client';
import { RoleProtected } from 'src/decorator/roleprotected';
import { CreateCustomerDTO } from 'src/model/dto/createCustomer.dto';
import { CustomerDTO } from 'src/model/dto/customer.dto';
import { AttendanceService } from 'src/service/attendance.service';
import { UserInformation } from 'src/service/auth.service';
import { CustomerService } from 'src/service/customer.service';

@Controller('/customers')
export class CustomerController {
    constructor(
        private readonly customerService: CustomerService,
        private readonly attendanceService: AttendanceService,
    ) {}

    @Get()
    async getAllCustomers(): Promise<CustomerDTO[]> {
        return (await this.customerService.getAllCustomers()).map((customer: Customer) => {
            return {
                id: customer.id,
                email: customer.email,
                name: customer.name,
                phone: customer.phone,
                createdAt: customer.createdAt,
            };
        });
    }

    @Get('/information/:id')
    async getUserInformationById(@Param('id') customerId: string): Promise<CustomerDTO> {
        const customer: Customer | null = await this.customerService.getCustomerById(customerId);

        if (!customer) throw new NotFoundException('No customer was found to the given id');

        const attendances: Attendance[] = await this.attendanceService.getAttendancesByCustomerId(customerId);

        return {
            id: customer.id,
            email: customer.email,
            name: customer.name,
            phone: customer.phone,
            createdAt: customer.createdAt,
            attendances: attendances.map((attendance: Attendance) => {
                return {
                    id: attendance.id,
                    createdAt: attendance.createdAt,
                    customerId: attendance.customerId,
                    description: attendance.description,
                    userId: attendance.userId,
                };
            }),
        };
    }

    @Post()
    @RoleProtected()
    async createCustomer(@Body() postData: CreateCustomerDTO, @Req() request: any): Promise<CustomerDTO> {
        const userId: string | undefined = (request as Request)?.user.userId;

        if (userId) {
            const customer: Customer = await this.customerService.createCustomer(postData, userId);

            return {
                id: customer.id,
                email: customer.email,
                name: customer.name,
                phone: customer.phone,
                createdAt: customer.createdAt,
            };
        }

        throw new BadRequestException('No valid user id was provided in the request');
    }
}

export interface Request {
    user: UserInformation;
}
