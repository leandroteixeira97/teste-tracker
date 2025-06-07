import { Module } from '@nestjs/common';
import { CustomerController } from 'src/controller/customer.controller';
import { CustomerService } from 'src/service/customer.service';
import { PrismaService } from 'src/service/prisma.service';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService, PrismaService],
})
export class CustomerModule {}
