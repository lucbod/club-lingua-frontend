import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private stompClient!: Stomp.Client;

  constructor() {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection(): void {
    const socket = new SockJS('https://club-lingua-backend.onrender.com/ws');
    this.stompClient = Stomp.over(socket);
  }

  public connect(nickname: string, fullname: string): Observable<any> {
    return new Observable((observer) => {
      this.stompClient.connect(
        {},
        (frame) => {
          observer.next(frame);
          this.stompClient.subscribe(
            `/user/${nickname}/queue/messages`,
            (message) => {
              observer.next(message);
            }
          );
          this.stompClient.subscribe(`/user/public`, (message) => {
            observer.next(message);
          });
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
          observer.error(error);
        }
      );
    });
  }

  sendMessage(message: string): void {
    // Modify this method to send messages as needed
  }
}
