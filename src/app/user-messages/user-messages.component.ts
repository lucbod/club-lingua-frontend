import { Component, OnInit } from '@angular/core';
import { UserStateService } from '../services/user-state.service';
import { RecepientStateService } from '../services/recepient-state.service';

@Component({
  selector: 'app-user-messages',
  templateUrl: './user-messages.component.html',
  styleUrls: ['./user-messages.component.css'],
})
export class UserMessagesComponent implements OnInit {
  selectedUserId: string | null = null;

  constructor(
    private userStateService: UserStateService,
    private recepientStateService: RecepientStateService
  ) {}

  ngOnInit(): void {
    this.selectedUserId = this.recepientStateService.getRecepientUserId();
  }
}
