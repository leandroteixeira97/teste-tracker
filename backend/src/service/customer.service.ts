import { Injectable } from '@nestjs/common';
import { CreateCustomerDTO } from 'src/model/dto/createCustomer.dto';
import { PrismaService } from './prisma.service';
import { Customer } from 'generated/prisma';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  getAllCustomers() {
    return 123;
  }

  async createCustomer(
    createCustomerDTO: CreateCustomerDTO,
    userId: string,
  ): Promise<Customer> {
    return await this.prisma.customer.create({data: {
        ...createCustomerDTO,
        createdById: userId
    }})
  }
}
