import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5050';

  constructor(private http: HttpClient) {}

  // ✅ LOGIN
  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  // ✅ GET PROFILE
  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/profile`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    });
  }

  // ✅ LOGOUT
  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('role');
    window.location.href = '/login';
  }
}
 