import { Component } from '@angular/core';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  nickname: string = '';
  fullname: string = '';

  constructor(private websocketService: WebsocketService) {}

  connect(): void {
    if (this.nickname && this.fullname) {
      this.websocketService.connect(this.nickname, this.fullname);
    }
  }
}
