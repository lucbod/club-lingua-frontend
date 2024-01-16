import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8088/users'; // Adjust the API endpoint

  constructor(private http: HttpClient) {}

  getConnectedUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
