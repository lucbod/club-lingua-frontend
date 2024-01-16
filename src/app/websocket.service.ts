import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private stompClient!: Stomp.Client;
  private nickname!: string;
  private fullname!: string;

  constructor(private router: Router) {}

  connect(nickname: string, fullname: string): void {
    // production
    // const socket = new SockJS('https://club-lingua-backend.onrender.com/ws');

    //dev
    const socket = new SockJS('http://localhost:8088/ws'); // Update the WebSocket URL

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

        // Redirect to /chat-window after successful connection
        this.router.navigate(['/chat-window']);
      },
      (error) => {
        console.error('Error during connection:', error);
        // Additional logic for handling connection error
      }
    );
  }

  onConnected(): void {
    // Subscribe to user-specific and public queues
    this.stompClient.subscribe(
      `/user/${this.nickname}/queue/messages`,
      this.onMessageReceived
    );
    this.stompClient.subscribe(`/user/public`, this.onMessageReceived);

    // Register the connected user
    this.stompClient.send(
      '/app/user.addUser',
      {},
      JSON.stringify({
        nickName: this.nickname,
        fullName: this.fullname,
        status: 'ONLINE',
      })
    );
    // TODO
    // 1. Update UI to show connected user's full name on the screen
    // document.querySelector('#connected-user-fullname').textContent = this.fullname;
    // 2. redirect user to chatapp window
    // 3. display Logout button

    // Fetch and display connected users
    this.findAndDisplayConnectedUsers().then(() => {
      // Additional logic after displaying connected users if needed
    });
  }

  sendMessage(message: string): void {
    // Modify this method to send messages as needed
  }

  private onMessageReceived(message: Stomp.Message): void {
    // Implement the logic to handle incoming messages
  }

  private findAndDisplayConnectedUsers(): Promise<void> {
    // Implement the logic to fetch and display connected users
    return Promise.resolve();
  }
}
