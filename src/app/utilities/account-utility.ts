import { LoginViewModel } from './../models/account/login.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { EnvironmentUrl } from './generic-utility';
import { GlobalSettingService } from '../services/Global/global-setting.service';

// const httpOptions = {
//     headers: new HttpHeaders({
//         'Content-Type': 'application/json; charset=UTF-8',
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Credentials': 'true',
//         'Access-Control-Allow-Headers': '*',
//         'Token': localStorage.getItem('AuthToken'),
//         'Accept': 'application/json'
//     })
// };
const httpUnauthorizedOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': '*',
        'Accept': 'application/json',
        'Referrer-Policy': 'strict-origin-when-cross-origin'
    })
};
@Injectable()
export class AccountUtility {
    baseApiIp = '';
    constructor(private http: HttpClient, private globalSettingsService: GlobalSettingService) {
        this.baseApiIp = EnvironmentUrl.getAPIUrl;
    }
    getToken(url: string, data: LoginViewModel, global: boolean = true): any {
        url = EnvironmentUrl.getAPIUrl + url;
        const cred = `grant_type=${data.grant_type}&username=${data.username}&password=${data.password}&encryptedCode=${data.encodedResponse}&isTalkRehab=${data.isTalkRehab}`;
        const httpOptionsForToken = {
            headers: new HttpHeaders({
            })
      };
        // return this.http.post(url.replace('/api', ''), cred, { headers: httpOptionsForToken.headers, observe: 'response' });
        return this.http.post(url.replace('/api', ''), cred, { headers: httpOptionsForToken.headers });
    }
    getUnauthorizePostCall(url: string, data: any, global: boolean = true): any {
        url = this.baseApiIp + url;
        return this.http.post(url, data, httpUnauthorizedOptions);
    }
    getUnauthorizeGetCall(url: string, global: boolean = true): any {
        url = this.baseApiIp + url;
        return this.http.get(url, httpUnauthorizedOptions);
    }
    getFileName(file: File): any {
        return file.name;
    }
    getFileExtension(fileName: string): any {
        return fileName.slice(fileName.lastIndexOf('.') + 1);
    }
    getFileSize(file: File): any {
        return file.size;
    }
    UploadSignatures(url: string, file: File): any {
        url = this.baseApiIp + url;
        const formData: FormData = new FormData();
        formData.append('Signatures', file);
        return this.http.post(url, formData);
    }
    trim(str: string): string {
        if (this.NullCheckFun(str)) {
            return str.trim();
        }
        return '';
    }
    NullCheckFun(obj: any): boolean {
        if (obj != null && obj !== undefined && obj !== '') {
            return true;
        }
        return false;
    }
}
