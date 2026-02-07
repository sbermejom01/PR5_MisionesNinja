import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API = environment.apiUrl;

  constructor(private http: HttpClient) {}

  //LOGIN
  login(username: string, password: string) {
    return this.http.post<any>(`${this.API}/auth/login`, {
      username,
      password
    });
  }

  //REGISTER
  register(username: string, password: string, rank: string) {
    return this.http.post<any>(`${this.API}/auth/register`, {
      username,
      password,
      rank
    });
  }

  saveSession(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}
