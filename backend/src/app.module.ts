import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './module/user.module';
import { CustomerModule } from './module/customer.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, CustomerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
