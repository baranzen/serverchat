import { ThrottlerGuard, ThrottlerRequest } from '@nestjs/throttler';
import { ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  protected async handleRequest(
    requestProps: ThrottlerRequest
  ): Promise<boolean> {
    const { context, limit, ttl } = requestProps;
    const response = context.switchToHttp().getResponse();

    try {
      // Temel sınıfın limit kontrolünü yap
      return await super.handleRequest(requestProps);
    } catch (error) {
      // Limit aşıldıysa özel hata mesajını gönder
      response.status(429).json({
        statusCode: 429,
        message: 'İstek limiti aşıldı. Lütfen daha sonra tekrar deneyin.',
        retryAfter: `${ttl / 1000} saniye sonra tekrar deneyin.`
      });
      return false;
    }
  }
} 