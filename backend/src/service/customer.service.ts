import { Injectable } from '@nestjs/common';
import { CreateCustomerDTO } from 'src/model/dto/createCustomer.dto';
import { PrismaService } from './prisma.service';
import { Customer } from 'generated/prisma';

@Injectable()
export class CustomerService {
    constructor(private prisma: PrismaService) {}

    async getAllCustomers(): Promise<Customer[]> {
        return await this.prisma.customer.findMany();
    }

    async createCustomer(createCustomerDTO: CreateCustomerDTO, userId: string): Promise<Customer> {
        return await this.prisma.customer.create({
            data: {
                ...createCustomerDTO,
                createdById: userId,
            },
        });
    }

    async getCustomerById(customerId: string): Promise<Customer | null> {
        return await this.prisma.customer.findUnique({ where: { id: customerId } });
    }
}
