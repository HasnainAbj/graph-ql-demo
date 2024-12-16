import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WsResponse,
} from '@nestjs/websockets';
import { UseGuards } from '@nestjs/common';
import { Socket } from 'socket.io';
import { AuthGuard } from 'src/guard/auth.guard';

@WebSocketGateway()
export class ChatGateway {
  @SubscribeMessage('send_message')
  @UseGuards(AuthGuard) // Protect messages with JWT authentication
  handleMessage(
    @MessageBody() message: string,
    _client: Socket,
  ): WsResponse<string> {
    return { event: 'receive_message', data: message };
  }

  @SubscribeMessage('join_room')
  handleJoinRoom(@MessageBody() room: string, client: Socket): void {
    client.join(room);
  }

  @SubscribeMessage('broadcast_message')
  @UseGuards(AuthGuard)
  handleBroadcast(@MessageBody() message: string, client: Socket): void {
    client.to('room1').emit('receive_message', message);
  }
}
