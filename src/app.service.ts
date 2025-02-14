import { Injectable } from '@nestjs/common';
import * as say from 'say';

@Injectable()
export class AppService {
  say(asd: { text: string , name: string, speed: number}) {
    say.stop();
    say.speak(asd.text, asd.name, asd.speed);
  }
}
