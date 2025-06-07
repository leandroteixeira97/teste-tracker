import { BadRequestException, Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Customer } from 'generated/prisma';
import { RoleProtected } from 'src/decorator/roleprotected';
import { CreateCustomerDTO } from 'src/model/dto/createCustomer.dto';
import { CustomerDTO } from 'src/model/dto/customer.dto';
import { UserInformation } from 'src/service/auth.service';
import { CustomerService } from 'src/service/customer.service';

@Controller('/customers')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) {}

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
