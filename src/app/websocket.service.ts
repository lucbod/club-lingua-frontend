import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private stompClient!: Stomp.Client;

  constructor() {}

  connect(nickname: string, fullname: string): void {
    const socket = new SockJS('https://club-lingua-backend.onrender.com/ws'); // Update the WebSocket URL
    this.stompClient = Stomp.over(socket);

    this.stompClient.connect(
      {},
      (frame) => {
        console.log('Connected:', frame);
        // Additional logic for handling successful connection

        // You can send data or do other operations here
        this.stompClient.send(
          '/app/user.addUser',
          {},
          JSON.stringify({
            nickName: nickname,
            fullName: fullname,
            status: 'ONLINE',
          })
        );
      },
      (error) => {
        console.error('Error during connection:', error);
        // Additional logic for handling connection error
      }
    );
  }

  sendMessage(message: string): void {
    // Modify this method to send messages as needed
  }
}
