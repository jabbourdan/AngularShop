import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  private apiUrl = 'http://localhost:3000/api/login'; // Adjust the URL if needed
  private isAuthenticated = false;
  private token: string | null = null;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { username, password });
  }

  saveToken(token: string): void {
    this.token = token;
    this.isAuthenticated = true;
    localStorage.setItem('authToken', token);
  }

  logout(): void {
    this.isAuthenticated = false;
    this.token = null;
    localStorage.removeItem('authToken');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('authToken') !== null;
  }

  getToken(): string | null {
    return this.token || localStorage.getItem('authToken');
  }

  getAuthHeaders() {
    const token = this.getToken();  
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  }
}
