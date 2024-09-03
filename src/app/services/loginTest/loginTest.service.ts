import { Injectable } from '@angular/core';
import { AccountUtility } from '../../utilities/account-utility';
import { GenericUtility } from '../../utilities/generic-utility';
import { SurveyAutomation, SurveyLink, UserAccount } from "../../models/login/login.model";
//import { PatientSurveyModel } from "../../models/patient-survey/patient-survey-model";
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AccountTestService {
  private apiUrl = 'http://localhost:11492/api/'; // Your API base URL
  constructor(private accountUtility: AccountUtility, private _servicecaller: GenericUtility, private http: HttpClient) { }

  // logintest(data: UserAccount): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrl}/Announcement/logintest`, data);
  // }

  logintest(data: UserAccount): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      // 'Content-Type': 'application/json',
    });

    return this.http.post<any>(`${this.apiUrl}/Announcement/logintest`, data, { headers });
  }
}
