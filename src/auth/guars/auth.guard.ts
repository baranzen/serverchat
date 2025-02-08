import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, NotFoundException, BadRequestException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private jwtService: JwtService) { } // inject the jwtService as if we are injecting the auth service in the auth controller, but jwt service is written for us by nestjs.

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authorization = request.headers.authorization;

        // Önce authorization header'ın varlığını kontrol et
        if (!authorization || !authorization.startsWith('Bearer ')) {
            throw new UnauthorizedException('JWT token is required for authentication');
        }

        const token = authorization.split(' ')[1];

        // Check if token exists after extraction
        if (!token) {
            throw new UnauthorizedException('JWT token is required for authentication');
        }

        // if we have token, we need to validate it
        try {
            const tokenPayload = await this.jwtService.verifyAsync(token);
            request.user = {
                userId: tokenPayload.sub,
                username: tokenPayload.username
            }
            request.baran = { test: 'hello' }
            console.log('user token', token);
            // if token is valid return true
            return true;
        } catch (error) {
            throw new UnauthorizedException('JWT token is invalid or has expired. Please sign in again to continue.');
        }
    }
}
