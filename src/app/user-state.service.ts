import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserStateService {
  private loggedInUser: any | null = null;
  setSelectedUserId: any;
  nickname: string | null = null;

  setLoggedInUser(user: any): void {
    this.loggedInUser = user;
  }

  getLoggedInUser(): any | null {
    return this.loggedInUser;
  }

  setNickname(nickname: string): void {
    this.nickname = nickname;
  }

  getNickname(): string | null {
    return this.nickname ?? null;
  }
}
