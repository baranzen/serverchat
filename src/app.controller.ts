import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('say')
  say(@Body() asd: { text: string , name: string, speed: number}) {
    return this.appService.say(asd);
  }
}
