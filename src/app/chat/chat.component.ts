import { Component } from '@angular/core';
import { WebsocketService } from '../services/websocket.service';
import { UserStateService } from '../services/user-state.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  nickname: string = '';
  fullname: string = '';

  constructor(
    private websocketService: WebsocketService,
    private userStateService: UserStateService
  ) {}

  connect(): void {
    if (this.nickname && this.fullname) {
      this.userStateService.setNickname(this.nickname);
      this.websocketService.connect(this.nickname, this.fullname);
    }
  }
}
