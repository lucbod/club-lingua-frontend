import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
})
export class ChatWindowComponent implements OnInit {
  userItemClick(_t6: any) {
    throw new Error('Method not implemented.');
  }
  message: any;
  userFullName: any;

  connectedUsers: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Fetch and display connected users on component initialization
    this.findAndDisplayConnectedUsers();
  }

  private findAndDisplayConnectedUsers(): void {
    this.userService.getConnectedUsers().subscribe((connectedUsers) => {
      this.connectedUsers = connectedUsers.filter(
        (user) => user.nickName !== this.userFullName
      );
    });
  }

  sendMessage() {
    throw new Error('Method not implemented.');
  }

  //TODO
  logout() {
    throw new Error('Method not implemented.');
  }
}
