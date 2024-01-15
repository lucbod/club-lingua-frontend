import { Component } from '@angular/core';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.css',
})
export class ChatWindowComponent {
  message: any;
  userFullName: any;
  sendMessage() {
    throw new Error('Method not implemented.');
  }

  //TODO
  logout() {
    throw new Error('Method not implemented.');
  }
}
