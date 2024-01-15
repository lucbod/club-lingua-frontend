// import { Component, OnInit } from '@angular/core';
// import { WebsocketService } from '../websocket.service';

// @Component({
//   selector: 'app-chat',
//   templateUrl: './chat.component.html',
//   styleUrl: './chat.component.css',
// })
// export class ChatComponent implements OnInit {
//   constructor(private websocketService: WebsocketService) {}

//   ngOnInit(): void {
//     const usernamePage = document.querySelector('#username-page');
//     const chatPage = document.querySelector('#chat-page');
//     const usernameForm = document.querySelector('#usernameForm');
//     const messageForm = document.querySelector('#messageForm');
//     const messageInput = document.querySelector('#message');
//     const connectingElement = document.querySelector('.connecting');
//     const chatArea = document.querySelector('#chat-messages');
//     const logout = document.querySelector('#logout');

//     let stompClient = null;
//     let nickname = null;
//     let fullname = null;
//     let selectedUserId = null;

//     // function connect(event) {
//     //   // ... connection logic ...
//     // }

//     // function onConnected() {
//     //   // ... onConnected logic ...
//     // }

//     // ... other functions ...

//     // usernameForm.addEventListener('submit', connect, true);
//     // messageForm.addEventListener('submit', sendMessage, true);
//     // logout.addEventListener('click', onLogout, true);
//     // window.onbeforeunload = () => onLogout();
//   }
// }

// SECOND TRY
// import { Component } from '@angular/core';
// import { WebsocketService } from '../websocket.service';

// @Component({
//   selector: 'app-chat',
//   templateUrl: './chat.component.html',
//   styleUrls: ['./chat.component.css'],
// })
// export class ChatComponent {
//   constructor(private websocketService: WebsocketService) {}

//   connect(event: Event): void {
//     const form = event.target as HTMLFormElement;
//     const nicknameInput = form.elements.namedItem(
//       'nickname'
//     ) as HTMLInputElement;
//     const fullnameInput = form.elements.namedItem(
//       'realname'
//     ) as HTMLInputElement;

//     const nickname = nicknameInput.value;
//     const fullname = fullnameInput.value;

//     this.websocketService.connect(nickname, fullname);
//     event.preventDefault();
//   }
// }

import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  nickname!: string;
  fullname!: string;

  constructor(private websocketService: WebsocketService) {}

  ngOnInit(): void {
    // Initialize your component logic here if needed
  }

  connect(): void {
    // Assume you have inputs with [(ngModel)] for nickname and fullname in your HTML

    if (this.nickname && this.fullname) {
      // Assuming you have a connect method in your WebsocketService
      this.websocketService.connect(this.nickname, this.fullname).subscribe(
        (frame) => {
          console.log('Connected:', frame);

          // Additional logic for handling successful connection
        },
        (error) => {
          console.error('Error during connection:', error);

          // Additional logic for handling connection error
        }
      );
    }
  }

  // Add other methods as needed for sending messages, logging out, etc.
}
