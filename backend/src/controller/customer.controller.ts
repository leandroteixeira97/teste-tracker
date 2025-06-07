import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req
} from '@nestjs/common';
import { Customer } from 'generated/prisma';
import { CreateCustomerDTO } from 'src/model/dto/createCustomer.dto';
import { CustomerDTO } from 'src/model/dto/customer.dto';
import { CustomerService } from 'src/service/customer.service';

@Controller('/customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  getAllCustomers() {
    return this.customerService.getAllCustomers();
  }

  @Post()
  async createCustomer(
    @Body() postData: CreateCustomerDTO,
    @Req() request: any
  ): Promise<CustomerDTO> {
    const userId: string | undefined = (request as Request)?.userId;

    if (userId) {
      const customer: Customer = await this.customerService.createCustomer(
        postData,
        userId,
      );

      return {
        id: customer.id,
        email: customer.email,
        name: customer.name,
        phone: customer.phone,
        createdAt: customer.createdAt,
      };
    }

    throw new BadRequestException(
      'No valid user id was provided in the request',
    );
  }
}

interface Request {
  userId: string
};
