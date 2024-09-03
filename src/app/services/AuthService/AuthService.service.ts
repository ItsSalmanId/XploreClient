import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AccountUtility } from '../../utilities/account-utility';
import { SurveyAutomation, SurveyLink, UserAccount } from "../../models/login/login.model";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:11492/api'; // Replace with your API URL

  constructor(private http: HttpClient, private accountUtility: AccountUtility) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { User_Name: username, PASSWORD: password })
      .pipe(
        tap(response => {
          if (response.token) {
            localStorage.setItem('token', response.token);
          }
        })
      );
  }


  logintest(data: UserAccount) {
    return this.accountUtility.getUnauthorizePostCall('SurveyAutomation/Login', data);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
  }
}
