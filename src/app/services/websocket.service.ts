import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  loggedInUser: any | null = null; // Store the logged-in user information here

  private stompClient!: Stomp.Client;
  private nickname!: string;
  private fullname!: string;

  constructor(private router: Router) {}

  connect(nickname: string, fullname: string): void {
    // production
    // const socket = new SockJS('https://club-lingua-backend.onrender.com/ws');

    //dev
    const socket = new SockJS('http://localhost:8088/ws');

    this.stompClient = Stomp.over(socket);

    this.stompClient.connect(
      {},
      (frame) => {
        console.log('Connected:', frame);
        //TODO
        // Additional logic for handling successful connection
        // send data or do other operations here
        this.stompClient.send(
          '/app/user.addUser',
          {},
          JSON.stringify({
            nickName: nickname,
            fullName: fullname,
            status: 'ONLINE',
          })
        );

        // Store the loggedInUser information
        this.loggedInUser = { nickName: nickname, fullName: fullname };

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
    // Remove logged in username from the list online users

    // Fetch and display connected users
    this.findAndDisplayConnectedUsers().then(() => {
      // Here commes dditional logic after displaying connected users if needed
    });
  }

  sendMessage(senderId: string, recipientId: string, content: string): void {
    const chatMessage = {
      senderId: senderId,
      recipientId: recipientId,
      content: content,
      timestamp: new Date(),
    };

    this.stompClient.send('/app/chat', {}, JSON.stringify(chatMessage));
  }

  private onMessageReceived(message: Stomp.Message): void {
    // TODO!!!
    // Implement the logic to handle incoming messages
  }

  private findAndDisplayConnectedUsers(): Promise<void> {
    // TODO: check if still necessary
    // Implement the logic to fetch and display connected users
    return Promise.resolve();
  }

  logout(nickname: string, fullname: any): void {
    if (this.stompClient) {
      const fullNameString = fullname.fullName;

      this.stompClient.send(
        '/app/user.disconnectUser',
        {},
        JSON.stringify({
          nickName: nickname,
          fullName: fullNameString,
          status: 'OFFLINE',
        })
      );
      // Close the WebSocket connection
      this.stompClient.disconnect(() => {
        console.log('WebSocket disconnected.');
        this.router.navigate(['/chat']);
      });
    }
  }
}
