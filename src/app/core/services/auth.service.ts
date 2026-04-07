import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

const API = 'https://api.escuelajs.co/api/v1';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Holds logged-in user data
  user = signal<any>(null);
  //Holds access token (initialized from localStorage on app start)
  accessToken = signal<string | null>(localStorage.getItem('access_token'));

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    // Send POST request to API with credentials
    return this.http.post<any>(`${API}/auth/login`, { email, password }).pipe(
      tap(res => {
        //Store tokens in browser storage 
        localStorage.setItem('access_token', res.access_token);
        localStorage.setItem('refresh_token', res.refresh_token);
        //Update reactive signal
        this.accessToken.set(res.access_token);
      })
    );
  }
register(name:string, email: string, password: string) {
  return this.http.post(`${API}/users`, {
    name,
    email,
    password,
    // Dummy avatar (API requirement)
    avatar: 'https://i.pravatar.cc/150'
  });
}
// current user
  getProfile() {
    return this.http.get(`${API}/auth/profile`).pipe(
      //Save user data in signal for global access
      tap(user => this.user.set(user))
    );
  }
  
// refresh_token to get new access_token
  refreshToken() {
    return this.http.post<any>(`${API}/auth/refresh-token`, {
      //Send stored refresh token to get new access token
      refreshToken: localStorage.getItem('refresh_token')
    }).pipe(
      tap(res => {
        // Replace old access token with new one
        localStorage.setItem('access_token', res.access_token);
        this.accessToken.set(res.access_token);
      })
    );
  }
// logout
  logout() {
    //clear all data
    localStorage.clear();
    this.user.set(null);
    this.accessToken.set(null);
  }
//CHECK IF USER IS LOGGED IN
  isAuthenticated() {
    // Returns true if token exists, false otherwise
    return !!this.accessToken();
  }
  
}