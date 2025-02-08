# ChatX WebSocket Service Documentation for Mobile Developers

## Overview
This documentation describes the WebSocket-based chat service built with NestJS that mobile applications can connect to. The service provides real-time messaging capabilities including user presence, typing indicators, and message history.

## WebSocket Connection Details

### Connection URL Format
```
ws://<server-host>:<port>
```

### Connection Options
- Transport: WebSocket (preferred) or Long Polling
- Protocol: Socket.IO v3 or higher
- Authentication: Currently not required
- CORS: Enabled for all origins

## Service Architecture

### Message Service (MessagesService)
Core service managing message and user state:

```typescript
interface Message {
    name: string;      // Sender's name
    message: string;   // Message content
}

interface ClientUser {
    [clientId: string]: string;  // Maps client IDs to usernames
}
```

Key Features:
- In-memory message storage
- User session management
- Message creation and retrieval
- User presence tracking

### WebSocket Events Reference

#### Client -> Server Events

1. **Join Chat Event**
```typescript
// Event: 'join'
// Payload:
{
    name: string  // User's display name
}
// Response: Array of current users
```

2. **Send Message Event**
```typescript
// Event: 'createMessage'
// Payload:
{
    message: string  // Message content
}
// Response: Created message object
```

3. **Request Message History**
```typescript
// Event: 'findAllMessages'
// Payload: None
// Response: Array of Message objects
```

4. **Leave Chat Event**
```typescript
// Event: 'leave'
// Payload: None
// Response: Array of remaining users
```

5. **Typing Status Event**
```typescript
// Event: 'typing'
// Payload:
{
    isTyping: boolean
}
// Response: None
```

#### Server -> Client Events

1. **New Message Event**
```typescript
// Event: 'message'
// Payload:
{
    name: string,     // Sender's name
    message: string   // Message content
}
```

2. **User Joined Event**
```typescript
// Event: 'userJoined'
// Payload: string (username)
```

3. **User Left Event**
```typescript
// Event: 'userLeft'
// Payload: string (username)
```

4. **Typing Indicator Event**
```typescript
// Event: 'typing'
// Payload:
{
    name: string,     // User who is typing
    isTyping: boolean // Typing status
}
```

## Implementation Guidelines for Mobile Clients

### Connection Management
1. Implement reconnection logic
2. Handle connection state changes
3. Maintain heartbeat mechanism

### Event Handling Best Practices
1. Set up event listeners before connecting
2. Implement proper error handling
3. Handle connection timeouts
4. Buffer messages during disconnection

### State Management Recommendations
1. Maintain local message cache
2. Track connection state
3. Implement optimistic updates
4. Handle message delivery status

### Error Handling
1. Connection failures
2. Event emission failures
3. Message delivery failures
4. Server disconnections

## Example Connection Flow

1. Initialize Socket Connection:
```typescript
// Example using Socket.IO client
const socket = io('ws://your-server:3000', {
    transports: ['websocket'],
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000
});
```

2. Join Chat:
```typescript
socket.emit('join', { name: 'UserName' }, (response) => {
    // Handle join response
});
```

3. Listen for Messages:
```typescript
socket.on('message', (message) => {
    // Handle new message
    // {name: string, message: string}
});
```

4. Send Message:
```typescript
socket.emit('createMessage', { message: 'Hello!' }, (response) => {
    // Handle send response
});
```

## Performance Considerations

### Mobile-Specific Optimizations
1. Implement message pagination
2. Use efficient serialization
3. Handle background/foreground transitions
4. Manage battery consumption

### Network Handling
1. Handle poor connectivity
2. Implement message queuing
3. Optimize reconnection strategy
4. Buffer messages during disconnection

## Security Notes
- No authentication currently implemented
- Messages are not encrypted
- All origins are allowed
- Basic profanity filter in place

## Current Limitations
1. No persistent storage
2. No user authentication
3. No private messaging
4. No message delivery status
5. No file sharing capabilities
6. No message encryption
7. No offline message queueing

## Future Improvements
1. User authentication
2. End-to-end encryption
3. Message persistence
4. Delivery receipts
5. Media message support
6. Private messaging
7. User profiles