import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  // in memory storage to manipulate messages and users to store them
  messages: Message[] = [
    { name: 'Boran', message: 'Hallo, wie geht\'s dir?' },
    { name: 'Max', message: 'Gut und selbst, danke dass du mich gefragt hast, freut mich.' },
  ];
  clientToUser = {};

  create(createMessageDto: CreateMessageDto, clientId: string) {
    console.log(createMessageDto);
    const message = {
      name: this.clientToUser[clientId],
      message: createMessageDto.message,
    };
    this.messages.push(message); //TODO: improve
    return message;
  }

  findAll() {
    return this.messages;
  }

  join(name: string, clientId: string) {
    this.clientToUser[clientId] = name;
    console.log({
      name,
      clientId,
      clientToUser: this.clientToUser,
    });
    return Object.values(this.clientToUser); // to see who is in the chat now online
  }

  leave(clientId: string) {
    const name = this.clientToUser[clientId];
    delete this.clientToUser[clientId];
    return { name };
  }

  getClientName(clientId: string) {
    return this.clientToUser[clientId];
  }
}
