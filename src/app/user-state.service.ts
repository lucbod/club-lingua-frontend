import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserStateService {
  private loggedInUser: any | null = null;
  setSelectedUserId: any;

  setLoggedInUser(user: any): void {
    this.loggedInUser = user;
  }

  getLoggedInUser(): any | null {
    return this.loggedInUser;
  }
}
