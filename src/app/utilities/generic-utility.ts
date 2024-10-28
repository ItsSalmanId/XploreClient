import { GlobalSettingService } from '../services/Global/global-setting.service';
// import { GlobalSettingService } from '../global/global-setting.service';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs';
import { Router } from '@angular/router';
//import { NgxSpinnerService } from 'ngx-spinner';
//import { LedgerModel } from '../models/reconciliation/reconciliation';

//import { ToastyService, ToastyConfig, ToastOptions } from 'ng2-toasty';
declare var $: any;

@Injectable()
export class GenericUtility implements OnInit {
  static filteredColumns: any[];
  progress$: any;
  private progressObserver: any;
  private progress: any;
  baseApiIp: string;

  constructor(
    public http: HttpClient,
    private router: Router,
    private _globalSettingService: GlobalSettingService,
    //private spinner: NgxSpinnerService,
    // private toastyConfig: ToastyConfig,
    // private toastyService: ToastyService
  ) {
    this.progress$ = Observable.create(observer => {
      this.progressObserver = observer;
    });
    this.baseApiIp = EnvironmentUrl.getAPIUrl;

    //this.toastyConfig.theme = 'default';
  }

  ngOnInit(): void {
  }

  // global method to set filtered columns
  setFilterColumns(columns: any = []) {
    GenericUtility.filteredColumns = [];
    if (columns != null && columns !== undefined && columns.length > 0) {
      for (let i = 0; i < columns.length; i++) {
        GenericUtility.filteredColumns.push(columns[i]);
      }
    }
  }

  getBaseIp() {
    return this.baseApiIp;
  }

  getGetCall(url: string, global: any = true): any {
    url = this.baseApiIp + url;
    // const practiceCode = this._globalSettingService.GetUserProfile.PracticeCode;
    // const userName = this._globalSettingService.GetUserProfile.UserName;
    // url = url + (url.indexOf('?') > -1 ? `&practiceCode=${practiceCode}&userName=${userName}` : `?practiceCode=${practiceCode}&userName=${userName}`);
    // return this.http.get(url, this.getHttpOptions).catch((err: HttpErrorResponse) => {
    //   return Observable.throw(this.errorHandler(err));
    // });
  }

  getPostCall(url: string, data: any, global: boolean = true): any {
    url = this.baseApiIp + url;
    // return this.http.post(url, data, this.getHttpOptions).
    //   catch((err: HttpErrorResponse) => {
    //     return Observable.throw(this.errorHandler(err));
    //   });
  }

  getPostCallSync(url: string, data: any, global: boolean = true): any {
    url = this.baseApiIp + url;
    return this.http.post(url, data, this.getHttpOptions).toPromise()
  }

  get getHttpOptions(): any {
    return this._globalSettingService.getHttpOptions;
  }

  errorHandler(error: HttpErrorResponse): void {
    window.console.log(error);
    if (error.url.includes("SendEmailOrFaxToSender")) {
      //this.ShowToast("Document has no pages", "No documents found to send please.", false);
      //this.spinner.hide();
    }
    if (error.status >= 500 && error.status < 600 && !error.url.includes("SendEmailOrFaxToSender")) {
      //this.spinner.hide();
      if (error.status == 502) {
        //this.ShowToast("Proxy Error", "Proxy error occurred while processing the request.", false);
      }
      else {
        //this.ShowToast("Error Occurred", "An error occurred while processing the request.", false);
      }
    }
    else if (error.status === 401) {
      //this.spinner.hide();
      this.router.navigate(['/account/login']);
    }
  }

  // public uploadAtPermanentFolderDirectory(
  //     event,
  //     folderNameAfterCommonDirectoryPath: string,
  //     IsToReturnServerPath = true): Observable<Array<FileRecieverResult>> {
  //     if (event !== undefined) {
  //         const files = event.srcElement.files;
  //         if (files !== undefined && files != null !== undefined) {
  //             if (folderNameAfterCommonDirectoryPath !== undefined && folderNameAfterCommonDirectoryPath !== '') {
  //                 return this.makeFileRequest(files, false, IsToReturnServerPath, folderNameAfterCommonDirectoryPath);
  //             }
  //         }
  //     }
  // }

  public uploadSignature(event, username): Observable<Array<FileRecieverResult>> {
    if (event !== undefined && username !== '') {
      const files = event.srcElement.files;
      if (files !== undefined && files != null) {
        return this.makeFileRequestForSignature(files, username);
      }
    }
  }

  public getUploadFileName(event) {
    let filesName = '';
    if (event !== undefined) {
      for (let i = 0; i < event.srcElement.files.length; i++) {
        filesName += event.srcElement.files[i].name + ',';
      }

    }
    return filesName !== '' ? filesName.substr(0, filesName.length - 1) : '';
  }

  // private makeFileRequest(
  //     files: File[],
  //     saveAtTemp: boolean,
  //     IsToReturnServerPath: boolean,
  //     folderNameAfterCommonDirectoryPath: string): Observable<Array<FileRecieverResult>> {
  //     return Observable.create(observer => {
  //         const formData: FormData = new FormData(),
  //             xhr: XMLHttpRequest = new XMLHttpRequest();
  //         xhr.onreadystatechange = () => {
  //             if (xhr.readyState === 4) {
  //                 if (xhr.status === 200) {
  //                     observer.next(JSON.parse(xhr.response));
  //                     observer.complete();
  //                 } else {
  //                     observer.error(xhr.response);
  //                 }
  //             }
  //         };
  //         xhr.upload.onprogress = (event) => {
  //             this.progress = Math.round(event.loaded / event.total * 100);
  //             this.progressObserver.next(this.progress);
  //         };
  //         xhr.open('POST', this.baseApiIp + 'FileReceiver/FileReceive', true);
  //         for (let i = 0; i < files.length; i++) {
  //             formData.append('uploads' + i, files[i], files[i].name);
  //             // formData.append("uploads", files[i].name);
  //             // formData.append("size", files[i], files[i].size.toString());
  //             // formData.append("type", files[i], files[i].type);
  //         }
  //         // xhr.setRequestHeader("X-File-Name", files[i].name);
  //         // xhr.setRequestHeader("Filesize", files[i].size.toString());
  //         xhr.setRequestHeader('Authorization',`Bearer ${this._globalSettingService.getAuthToken}`);
  //         xhr.setRequestHeader('IsTempFolder', saveAtTemp ? 'true' : 'false');
  //         xhr.setRequestHeader('IsToReturnServerPath', IsToReturnServerPath ? 'true' : 'false');
  //         if (folderNameAfterCommonDirectoryPath !== '') {
  //             xhr.setRequestHeader('Folder', folderNameAfterCommonDirectoryPath);
  //         }
  //         xhr.send(formData);
  //     });
  // }

  private makeFileRequestForSignature(files: File[], username: string): Observable<Array<FileRecieverResult>> {
    return Observable.create(observer => {
      const formData: FormData = new FormData(),
        xhr: XMLHttpRequest = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            observer.next(JSON.parse(xhr.response));
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };
      xhr.upload.onprogress = (event) => {
        this.progress = Math.round(event.loaded / event.total * 100);
        this.progressObserver.next(this.progress);
      };
      xhr.open('POST', this.baseApiIp + 'Settings/UploadSignature', false);
      for (let i = 0; i < files.length; i++) {
        formData.append('uploads' + i, files[i], files[i].name);
      }
      formData.append('username', username);
      xhr.setRequestHeader('Authorization', `Bearer ${this._globalSettingService.getAuthToken}`);
      xhr.send(formData);
    });
  }

  GetExtention(event) {
    const fileName = this.getUploadFileName(event);
    const extention = fileName.substring(fileName.lastIndexOf('.') + 1);
    return extention;
  }

  GetClientDomain(): string {
    return EnvironmentUrl.getClientUrl;
  }

  GetClientDomainForSignature(): string {
    return EnvironmentUrl.getClientUrl;
  }

  UploadTaskAttachment(url: string, file: File): any {
    url = this.baseApiIp + url;
    const formData: FormData = new FormData();
    formData.append('TaskAttachment', file, file.name);
    // return this.http.post(url, formData, { headers: { 'Authorization': `Bearer ${this._globalSettingService.getAuthToken}` } }).catch(
    //   // (error: HttpErrorResponse) => {
    //   //   return Observable.throw(this.fileUploadErrors(error));
    //   // }
    // );
  }

  UploadReconsiliationAttachment(url: string, file: File): any {
    url = this.baseApiIp + url;
    const formData: FormData = new FormData();
    formData.append('TaskAttachment', file, file.name);

    // return this.http.post(url, formData, { headers: { 'Authorization': `Bearer ${this._globalSettingService.getAuthToken}` } }).catch(
    //   // (error: HttpErrorResponse) => {
    //   //   return Observable.throw(this.fileUploadErrors(error));
    //   // }
    // );
  }

  // UploadReconsiliationAttachment1(url: string, legerDetails: LedgerModel): any {
  //   url = this.baseApiIp + url;
  //   const formData: FormData = new FormData();
  //   formData.append('TaskAttachment', legerDetails.file, legerDetails.file.name);
  //   formData.append('reconsiliationId', legerDetails.RECONCILIATION_CP_ID.toString());
  //   return this.http.post(url, formData, { headers: { 'Authorization': `Bearer ${this._globalSettingService.getAuthToken}` } }).catch(
  //     (error: HttpErrorResponse) => {
  //       //return Observable.throw(this.fileUploadErrors(error));
  //     }
  //   );
  // }

  fileUploadErrors(err: HttpErrorResponse) {

  }


  // ShowToast(title: string, message: string, success: boolean) {
  //   let timeOut: number = success ? 2000 : 4000;
  //   let toastOptions: ToastOptions = {
  //     title: title,
  //     msg: message,
  //     timeout: timeOut
  //   };

  //   if (success)
  //     this.toastyService.success(toastOptions);
  //   else {
  //     this.toastyService.error(toastOptions);
  //   }
  // }

}

export class FileRecieverResult {
  FileName: string;
  FilePath: string;
  AccessType: string;
}

export class EnvironmentUrl {
  public static get getAPIUrl(): string {
    const clientDomain: string = window.location.origin;
    let _url: string;

    if (clientDomain.includes('localhost')) {
      return 'http://45.61.134.14:80/api/';
    } 
    else if (clientDomain.includes('http://172.16.0.207'))
    {
      let domainParts = clientDomain.split('http://172.16.0.207:');
      let portNumber = parseInt(domainParts[1]) - 1;
      _url  = `http://172.16.0.207:${portNumber}/api/`;
    }
    else
    {
      // let domainWithoutHttp = clientDomain.split('https://');
      // let domainWithEnvironment = (domainWithoutHttp[1].split('.mtbc.com'));
      // let domainConcate= domainWithEnvironment[0]+ "api"
      // _url  = `https://${domainConcate}.mtbc.com/api/`;

      // let domainWithoutHttp = clientDomain.split('https://');
      // let domainWithEnvironment = (domainWithoutHttp[1].split('.xplore.com'));
      // let domainConcate= domainWithEnvironment[0];
      // _url  = `https://${domainConcate}/api/`;
      //https://45.61.134.14:81
     // https://www.xploradoor.com/
//       let domainWithoutHttp = clientDomain.split('https://');
// let domainWithEnvironment = (domainWithoutHttp[1].split('.xplore.com'));
// let domainConcate= domainWithEnvironment[0];
// _url  = `https://${domainConcate}/api/`;

// let domainWithoutHttp = clientDomain.split('https://');
// let domainWithEnvironment = (domainWithoutHttp[1].split('.xplore.com'));
// let domainConcate= domainWithEnvironment[0];
// _url  = `https://${domainConcate}/api/`;


// let domainParts = clientDomain.split('http://172.16.0.207:');
// let portNumber = parseInt(domainParts[1]) - 1;
_url  = `http://45.61.134.14:80/api/`;

    }
    return _url;
  }

  public static get getClientUrl(): string {
    return window.location.origin + '/';
  }
}
