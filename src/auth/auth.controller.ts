import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user.login.dto';
import { AuthGuard } from './guars/auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { } // Inject the AuthService

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body(ValidationPipe) userLoginDto: UserLoginDto) {
        return this.authService.authenticate(userLoginDto);
    }

    /* this endpoint is protected by this guard. canactivate method validate the token. depending on the outcome we will accep or reject the request. */
    // We can get the request that we updated in the guard by using the request decorator from the nesjts common lib.
    @UseGuards(AuthGuard)
    @Get('me')
    getUserInfo(@Request() request) {
        console.log('request', request);
        return request.user;
    }
}
