import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RecepientStateService {
  private recepientUserId: string | null = null;

  setRecepientUserId(userId: string): void {
    this.recepientUserId = userId;
  }

  getRecepientUserId(): string | null {
    return this.recepientUserId ?? null;
  }
}
