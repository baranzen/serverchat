import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Server, Socket } from 'socket.io';
// This is kind of a controller except that instead of it working with urls, you know with an http api, it instead works with events.

@WebSocketGateway({
  cors: {
    origin: true, // Tüm originlere izin ver
    methods: ['GET', 'POST'],
    credentials: true,
  },
  allowEIO3: true, // Socket.IO version 3 desteği
  transports: ['websocket', 'polling']
})
export class MessagesGateway {
  //! this is the socket.io server instance, we can use it to emit events to the client
  @WebSocketServer()
  server: Server;

  // we are injecting the messagesService to use the create method
  constructor(private readonly messagesService: MessagesService) { }

  @SubscribeMessage('createMessage')
  async create(@MessageBody() createMessageDto: CreateMessageDto, @ConnectedSocket() client: Socket) {
    const message = await this.messagesService.create(createMessageDto, client.id);
    this.server.emit('message', message); // pass the payload to the client
    return message;
  }

  @SubscribeMessage('findAllMessages') // when you join a chat room, you probably want to be able to see the old messages, so you send this event to the server
  findAll() {
    return this.messagesService.findAll();
  }

  // ConnectedSocket is a decorator that allows you to get the client instance, so we can use it to join a room and leave a room and send messages to the client
  @SubscribeMessage('join')
  joinRoom(@MessageBody('name') name: string, @ConnectedSocket() client: Socket) {
    const users = this.messagesService.join(name, client.id);
    // Yeni kullanıcı katıldı bildirimi
    this.server.emit('userJoined', name);
    return users; // Online kullanıcı listesi
  }

  @SubscribeMessage('leave')
  leaveRoom(@ConnectedSocket() client: Socket) {
    const { name } = this.messagesService.leave(client.id);
    if (name) {
      this.server.emit('userLeft', name);
    }
    return Object.values(this.messagesService.clientToUser); // Güncel kullanıcı listesini döndür
  }

  // Bağlantı koptuğunda da aynı işlemi yap
  handleDisconnect(client: Socket) {
    const { name } = this.messagesService.leave(client.id);
    if (name) {
      this.server.emit('userLeft', name);
      this.server.emit('join', Object.values(this.messagesService.clientToUser));
    }
  }

  @SubscribeMessage('typing')
  sendMessage(@MessageBody('isTyping') isTyping: boolean, @ConnectedSocket() client: Socket) {
    const name = this.messagesService.getClientName(client.id);
    client.broadcast.emit('typing', { name, isTyping }); // this is to send the event to all the clients except the one that is sending the event
  }
}
