import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from './messages/messages.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { CustomThrottlerGuard } from './core/guards/custom-throttler.guard';

@Module({
  imports: [
    MessagesModule,
    UsersModule,
    AuthModule,
    ThrottlerModule.forRoot({
      throttlers: [{
        ttl: 60000, // 1 dakika (milisaniye cinsinden)
        limit: 10, // Maksimum 10 istek
      }]
    }),
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: CustomThrottlerGuard,
  }],
})
export class AppModule {}
