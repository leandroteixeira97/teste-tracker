import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginDTO } from 'src/model/dto/login.dto';
import { Public } from '../decorator/public';
import { AuthService, LoginResponse } from '../service/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() loginDTO: LoginDTO): Promise<LoginResponse> {
        if (!loginDTO.email || !loginDTO.passwordHash) {
            throw new BadRequestException('Invalid login parameters');
        }

        return await this.authService.login(loginDTO.email, loginDTO.passwordHash);
    }
}
