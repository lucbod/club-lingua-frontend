import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { lastValueFrom } from 'rxjs';
import { WebsocketService } from './websocket.service';
import { UserStateService } from './user-state.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private websocketService: WebsocketService,
    private userStateService: UserStateService
  ) {}

  async getUserChatMessages(recipientId: string): Promise<any[]> {
    const senderId = this.userStateService.getNickname();

    if (!senderId) {
      console.error('Sender ID is undefined.');
      return [];
    }

    console.log('sender/nickname:', senderId);
    console.log('receiverId:', recipientId);
    const endpoint = `http://localhost:8088/messages/${senderId}/${recipientId}`;

    try {
      const response = await lastValueFrom(this.http.get<any[]>(endpoint));
      return response;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  private apiUrl = 'http://localhost:8088/users'; // Adjust the API endpoint

  getConnectedUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
