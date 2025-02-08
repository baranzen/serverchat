import { IsNotEmpty, MinLength } from "class-validator";
import { Message } from "../entities/message.entity";

// we are extending the Message entity to create a new message, because we want to use the sender and message properties and dont want to duplicate them.
export class CreateMessageDto extends Message {}


