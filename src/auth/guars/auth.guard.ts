import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, NotFoundException, BadRequestException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private jwtService: JwtService) { } // JwtService, JWT token'larını doğrulamak için kullanılır. NestJS tarafından sağlanır.

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest(); // HTTP isteğini alır.
        const authorization = request.headers.authorization; // İstek başlığındaki 'authorization' alanını alır.

        // Önce authorization header'ın varlığını kontrol et
        if (!authorization || !authorization.startsWith('Bearer ')) {
            throw new UnauthorizedException('JWT token is required for authentication'); // Eğer 'authorization' başlığı yoksa veya 'Bearer ' ile başlamıyorsa hata fırlatır.
        }

        const token = authorization.split(' ')[1]; // 'Bearer ' ön ekini kaldırarak token'ı alır.

        // Check if token exists after extraction
        if (!token) {
            throw new UnauthorizedException('JWT token is required for authentication'); // Token yoksa hata fırlatır.
        }

        // if we have token, we need to validate it
        try {
            const tokenPayload = await this.jwtService.verifyAsync(token); // Token'ı doğrular ve içeriğini çözümler.
            request.user = {
                userId: tokenPayload.sub, // Token içindeki 'sub' (subject) alanını kullanıcı ID'si olarak ayarlar.
                username: tokenPayload.username // Token içindeki 'username' alanını kullanıcı adı olarak ayarlar.
            }
            request.baran = { test: 'hello' } // Örnek bir özellik ekler (bu satır test amaçlıdır).
            console.log('user token', token); // Token'ı konsola yazdırır (debug amaçlı).
            // if token is valid return true
            return true; // Token geçerliyse true döner ve isteğin devam etmesine izin verir.
        } catch (error) {
            throw new UnauthorizedException('JWT token is invalid or has expired. Please sign in again to continue.'); // Token geçersiz veya süresi dolmuşsa hata fırlatır.
        }
    }
}
