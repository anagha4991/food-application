import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

const API = 'https://api.escuelajs.co/api/v1';

@Injectable({ providedIn: 'root' })
export class AuthService {

  user = signal<any>(null);
  accessToken = signal<string | null>(localStorage.getItem('access_token'));

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<any>(`${API}/auth/login`, { email, password }).pipe(
      tap(res => {
        localStorage.setItem('access_token', res.access_token);
        localStorage.setItem('refresh_token', res.refresh_token);
        this.accessToken.set(res.access_token);
      })
    );
  }
register(name:string, email: string, password: string) {
  return this.http.post(`${API}/users`, {
    email,
    password,
    name,
    avatar: 'https://i.pravatar.cc/150'
  });
}
  getProfile() {
    return this.http.get(`${API}/auth/profile`).pipe(
      tap(user => this.user.set(user))
    );
  }
  

  refreshToken() {
    return this.http.post<any>(`${API}/auth/refresh-token`, {
      refreshToken: localStorage.getItem('refresh_token')
    }).pipe(
      tap(res => {
        localStorage.setItem('access_token', res.access_token);
        this.accessToken.set(res.access_token);
      })
    );
  }

  logout() {
    localStorage.clear();
    this.user.set(null);
    this.accessToken.set(null);
  }

  isAuthenticated() {
    return !!this.accessToken();
  }
  
}