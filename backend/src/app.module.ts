import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './module/user.module';
import { CustomerModule } from './module/customer.module';
import { AttendanceModule } from './module/attendance.module';

@Module({
    imports: [ConfigModule.forRoot(), UserModule, CustomerModule, AttendanceModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
