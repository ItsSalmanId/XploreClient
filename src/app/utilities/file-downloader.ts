import { GlobalSettingService } from '../services/Global/global-setting.service';
import { GenericUtility } from "./generic-utility";
import { Injectable } from '@angular/core';
//import { saveAs } from 'file-saver';
@Injectable()
export class FileDownloader {
    constructor(private genericUtill: GenericUtility, private _globalSettingService: GlobalSettingService ) {

    }
    downloadFile(completeFilePathWithFileName: string, consentToCareCall: boolean = false) {
        if (completeFilePathWithFileName != undefined) {
            let fileName = "";
            if(consentToCareCall == true)
            {
                fileName = this.getConsentToCareFileName(completeFilePathWithFileName);
            }
            else
            {
                fileName = this.getFileName(completeFilePathWithFileName);
            }
            var xhr = new XMLHttpRequest();
            xhr.open("GET", this.genericUtill.getBaseIp() + "Common/DownloadSingleFile");
            xhr.responseType = "arraybuffer";
            xhr.setRequestHeader('Authorization', `Bearer ${ this._globalSettingService.getAuthToken }`);
            xhr.setRequestHeader('FilePath', completeFilePathWithFileName);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    var blob = new Blob([xhr.response], { type: "*" });
                    //saveAs(blob, fileName);
                } else {
                    console.log("Error downloading file");
                }
            };
            xhr.send();
        } else {
            console.log("File path not provided")
        }
    }
    downloadSampleFile(filePath: string) {
        if (filePath != undefined) {
            let fileName = this.getFileName(filePath);
            var xhr = new XMLHttpRequest();
            xhr.open("GET", this.genericUtill.getBaseIp() + "Common/DownloadSingleFile");
            xhr.responseType = "arraybuffer";
            xhr.setRequestHeader('Authorization', `Bearer ${ this._globalSettingService.getAuthToken }`);
            xhr.setRequestHeader('FilePath', filePath);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    var blob = new Blob([xhr.response], { type: "*" });
                    //saveAs(blob, 'sample.csv');
                } else {
                    console.log("Error downloading file");
                }
            };
            xhr.send();
        } else {
            console.log("File path not provided")
        }
    }
    private getFileName(path: string) {
        return path.split('/').pop();
    }
    private getConsentToCareFileName(path: string) {
        return path.split('ConsentToCareDocuments\\\\').pop();
    }
    private isFileNameValid(fileName) {
        let validName = fileName.split('.');
        if (validName.length > 0) {
            return true;
        }
        return false;
    }
    
    downloadFileWithOriginalName(completeFilePathWithFileName: string, title: string) {
        if (completeFilePathWithFileName != undefined) {
            let fileName = this.getFileName(completeFilePathWithFileName);
            var xhr = new XMLHttpRequest();
            xhr.open("GET", this.genericUtill.getBaseIp() + "Common/DownloadSingleFile");
            xhr.responseType = "arraybuffer";
            xhr.setRequestHeader('Authorization', `Bearer ${this._globalSettingService.getAuthToken}`);
            xhr.setRequestHeader('FilePath', completeFilePathWithFileName);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    var blob = new Blob([xhr.response], { type: "*" });
                    //saveAs(blob, title);
                } else {
                    console.log("Error downloading file");
                }
            };
            xhr.send();
        } else {
            console.log("File path not provided")
        }
    }

       downloadSingleFileError(Path) {
       var filePath = Path;
       var fileName = this.getFileName(filePath);
       var xhr = new XMLHttpRequest();
       let that = this;
           xhr.open("GET", this.genericUtill.getBaseIp() + "SignUp/DownloadSingleFileError");
       xhr.responseType = "arraybuffer";
       xhr.setRequestHeader('FilePath', filePath);
       xhr.onload = function () {
           if (xhr.status === 200) {
               var blob = new Blob([xhr.response], { type: "*" });
               //saveAs(blob, "InvalidRecords.txt");
               that.DeleteFile(Path);
           }
           else {
               console.log("Error downloading file");
           }
       };
       xhr.send();
       }

       DeleteFile(path) {
       let filePath = path;
       let deleteObj:any = { "path": filePath };
       deleteObj = JSON.stringify(deleteObj);
    //    $.ajax({
    //        type: "POST",
    //        url: this.genericUtill.getBaseIp() + "/SignUp/RemoveErrorFile",
    //        data: deleteObj,
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "json",
    //        error: function (er) { console.log(er.responseText); }
    //    });

    }

}
