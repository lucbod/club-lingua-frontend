import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserStateService } from '../services/user-state.service';
import { WebsocketService } from '../services/websocket.service';
import { RecepientStateService } from '../services/recepient-state.service';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
})
export class ChatWindowComponent implements OnInit {
  message: any;
  userFullName: any;
  loggedInUser: any;
  messages: any[] = [];

  connectedUsers: any[] = [];
  messageFormHidden: boolean = false;
  userChatMessages: string[] = [];

  constructor(
    private userService: UserService,
    private userStateService: UserStateService,
    private websocketService: WebsocketService,
    private recepientStateService: RecepientStateService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    // Fetch and display connected users on component initialization
    this.findAndDisplayConnectedUsers();

    // Access the loggedInUser information from WebsocketService
    this.loggedInUser = this.websocketService.loggedInUser;
    this.userFullName = this.loggedInUser?.fullName;

    // Subscribe to changes in the messages from the service
    this.chatService.messages$.subscribe((messages) => {
      this.messages = messages;
    });

    // Fetch initial messages
    const recepientId = this.recepientStateService.getRecepientUserId();

    // Check if recepientId is not null before calling getUserChatMessages
    if (recepientId !== null) {
      this.getUserChatMessages(recepientId);
    } else {
      console.error('Recepient ID is null.');
    }
  }

  async getUserChatMessages(recipientId: string): Promise<void> {
    // Fetch messages from the user.service
    const messages = await this.userService.getUserChatMessages(recipientId);

    // Update the messages in the service
    this.chatService.updateMessages(messages);
  }

  private findAndDisplayConnectedUsers(): void {
    this.userService.getConnectedUsers().subscribe((connectedUsers) => {
      this.connectedUsers = connectedUsers.filter(
        (user) => user.nickName !== this.userFullName
      );
    });
  }

  userItemClick(user: any): void {
    console.log('user clicked:' + user);

    this.clearActiveUsers();
    this.messageFormHidden = false;

    // Add logic to fetch and display user-specific chat
    this.recepientStateService.setRecepientUserId(user.nickName);
    this.fetchAndDisplayUserChat().then();

    // Update the UI for the clicked user
    const nbrMsg = document.querySelector(
      `#${user.nickName} .nbr-msg`
    ) as HTMLElement;
    if (nbrMsg) {
      nbrMsg.classList.add('hidden');
      nbrMsg.textContent = '0';
    }
  }

  private clearActiveUsers(): void {
    document.querySelectorAll('.user-item').forEach((item) => {
      item.classList.remove('active');
    });
  }
  sendMessage(content: string): void {
    const recipientId = this.recepientStateService.getRecepientUserId() ?? '';
    const nickName = this.userStateService.getNickname() ?? '';
    this.websocketService.sendMessage(nickName, recipientId, content);

    //reset form
    this.message = '';

    // refresh msgs to see the new one
    this.userService.getUserChatMessages(recipientId);
  }

  async fetchAndDisplayUserChat(): Promise<void> {
    const selectedUserId = this.recepientStateService.getRecepientUserId();
    console.log('SelectedUser: ' + selectedUserId);
    if (selectedUserId) {
      try {
        const messages = await this.userService.getUserChatMessages(
          selectedUserId
        );

        // Assign the messages to the component property
        this.messages = messages;

        // Process and display messages
        console.log('User chat messages:', messages);
      } catch (error) {
        console.error(error);
      }
    }
  }

  logout(): void {
    const nickname = this.userStateService.nickname;
    const fullname = this.websocketService.loggedInUser;
    if (nickname != null) {
      this.websocketService.logout(nickname, fullname);
    } else {
      console.log('nickname' + nickname);
      throw new Error('nickname is null');
    }
  }
}
