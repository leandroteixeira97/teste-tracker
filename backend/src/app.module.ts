import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './module/user.module';
import { CustomerModule } from './module/customer.module';
import { AttendanceModule } from './module/attendance.module';
import { AuthModule } from './module/auth.module';

@Module({
    imports: [ConfigModule.forRoot(), UserModule, CustomerModule, AttendanceModule, AuthModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
