import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UserLoginDto } from './dto/user.login.dto';
import * as say from 'say';

type SignInData = {
    userId: number;
    username: string;
};

type AuthResult = {
    access_token: string;
    userId: number;
    username: string;
};

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService, // bunu neden kullanıyoruz? çünkü jwtService ile token oluşturacağız
    ) { }

    async authenticate(userLoginDto: UserLoginDto): Promise<AuthResult | null> {
        const user = await this.validateUser(userLoginDto);

        if (!user) {
            throw new UnauthorizedException();
        }
        say.stop();
        say.speak(`Kullanıcı ${user.username} giriş yaptı!`, 'Yelda', 1);
        return this.signIn(user);
    }

    async validateUser(userLoginDto: UserLoginDto): Promise<SignInData | null> {
        const user = await this.usersService.findUserByName(userLoginDto.username);

        if (user && user.password === userLoginDto.password) {
            return { userId: user.userId, username: user.username };
        }
        return null;
    }

    async signIn(user: SignInData): Promise<AuthResult> {
        const tokenPayload = {
            sub: user.userId,
            username: user.username,
        }

        const accessToken = await this.jwtService.signAsync(tokenPayload);

        return { access_token: accessToken, userId: user.userId, username: user.username };
    }

    async signOut(): Promise<void> { // Swfitteki Result ile ayni
        // JWT tabanlı sistemde çıkış işlemi, token'ı istemciden silmekten ibarettir.
        // İstemci token'ı (örneğin, localStorage, cookies) silecektir.
        // Sunucuda herhangi bir işlem gerekmez.
        return;
    }
}
