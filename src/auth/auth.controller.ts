import { Body, Controller, HttpCode, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user.login.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { } // Inject the AuthService

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body(ValidationPipe) userLoginDto: UserLoginDto) {
        return this.authService.authenticate(userLoginDto);
    }
}
