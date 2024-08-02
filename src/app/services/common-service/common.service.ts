// import { Injectable } from '@angular/core';
// import { GenericUtility } from '../../utilities/generic-utility';
// import { FileDownloader } from '../../utilities/file-downloader';
// import { Subscription } from "rxjs";
// import { SmartSearchRequest } from "../../models/account/smart-search-request.model";
// import { GlobalSettingService } from '..//Global/global-setting.service';
// import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
// import { Tab } from '../../models/shared/common-shared';
// import { SmartReq } from '../../models/index-info/index-info';
// import { DeviceDetectorService } from 'ngx-device-detector';
// import { Router } from '@angular/router';
// import * as CryptoJS from 'crypto-js';
// declare var $: any;

// @Injectable()
// export class CommonService {
//     download: Subscription;

//     constructor(private _servicecaller: GenericUtility, private fileDownloader: FileDownloader, private _globalSettingService: GlobalSettingService, private toastyConfig: ToastyConfig, private toastyService: ToastyService
//         , private deviceService: DeviceDetectorService, private globalSettingService: GlobalSettingService, private router: Router) {
//         this.toastyConfig.theme = 'default';
//     }

//     GenerateFile(data) {
//         this._servicecaller.getGetCall(`Common/GeneratePdfFile?workId=${data}`)
//             .subscribe(
//                 response => {
//                     var filePath = response;
//                     if (filePath != "") {
//                         this.fileDownloader.downloadFile(filePath);
//                     }
//                 }
//             );
//     }

//     ShowToast(title: string, message: string, success: boolean) {
//         let timeOut: number = success ? 4000 : 6000;
//         let toastOptions: ToastOptions = {
//             title: title,
//             msg: message,
//             timeout: timeOut
//         };

//         if (success)
//             this.toastyService.success(toastOptions);
//         else {
//             this.toastyService.error(toastOptions);
//         }
//     }

//     // Added new logic to delete files when downloaded successfully.

//     decrypt(decString) {
//         var key = CryptoJS.enc.Utf8.parse("8056483646328763");
//         var iv = CryptoJS.enc.Utf8.parse("8056483646328763");
//         var decrypted = CryptoJS.AES.decrypt(decString, key, {
//             keySize: 128 / 8,
//             iv: iv,
//             mode: CryptoJS.mode.CBC,
//             padding: CryptoJS.pad.Pkcs7
//         });
//         return decrypted.toString(CryptoJS.enc.Utf8);
//     }
//     encrypt(stringToEncrypt: any) {
//         var key = CryptoJS.enc.Utf8.parse("8056483646328763");
//         var iv = CryptoJS.enc.Utf8.parse("8056483646328763");
//         var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(stringToEncrypt), key, {
//             keySize: 128 / 8,
//             iv: iv,
//             mode: CryptoJS.mode.CBC,
//             padding: CryptoJS.pad.Pkcs7
//         });
//         return encrypted.toString();
//     }
//     GeneratePDFForSplitFiles(unique_id) {
//         if (this.download != undefined) {
//             this.download.unsubscribe();
//         }
//         this.download = this._servicecaller.getGetCall(`Common/GeneratePdfFileForSplitRecord?unique_id=${unique_id}`).debounceTime(300).subscribe(response => {
//             var filePath = response;
//             if (filePath != '') {
//                 this.fileDownloader.downloadFile(filePath);
//                 setTimeout(() => {
//                     if (this.NullCheckFun(filePath)) {
//                         let fileLocation: any;
//                         fileLocation = filePath
//                         var encryptedFileLocation = this.encrypt(fileLocation);
//                         this._servicecaller.getGetCall(`Common/DeleteDownloadedFile?fileLocation=${encryptedFileLocation}`).subscribe(
//                             response => {
//                                 if (response) { }
//                             }
//                         );
//                     }
//                 }
//                     , 10000);
//             }
//             else {
//                 // $("#errorModal_download").modal("show");
//                 // setTimeout(function () {
//                 //     $("#errorModal_download").modal("hide");
//                 // }, 3000);

//                 this.ShowToast((this.globalSettingService.istalkRehab) ? "CareCloud Remote" : "Fox Rehabilitation", "No file exists.", false);
//             }
//         });
//     }

//     GeneratePDFForAllFiles(unique_id) {
//         this._servicecaller.getGetCall(`Common/GeneratePdfFileForAllRecord?unique_id=${unique_id}`).subscribe(
//             response => {
//                 var filePath = response;
//                 if (filePath != "") {
//                     this.fileDownloader.downloadFile(filePath);
//                 }
//                 else {
//                     // alert("Files can't be downloaded at the moment.");
//                     // $("#errorModal_download").modal('show');
//                     // setTimeout(function () {
//                     //     $('#errorModal_download').modal('hide');
//                     // }, 3000);

//                     this.ShowToast((this.globalSettingService.istalkRehab) ? "CareCloud Remote" : "Fox Rehabilitation", "No file exists.", false);
//                 }
//             });
//     }

//     GenerateFileIndexInfo(filePath, FileName) {
//         if (filePath != '') {
//             this.fileDownloader.downloadFileWithOriginalName(filePath, FileName);
//         }
//     }

//     GetFiles(unique_id) {
//         return this._servicecaller.getGetCall('Common/GetFiles?unique_Id=' + unique_id);
//     }

//     GetAllOriginalFiles(unique_id) {
//         return this._servicecaller.getGetCall('Common/GetAllOriginalFiles?unique_Id=' + unique_id);
//     }

//     GetWorkOrderHistory(unique_id) {
//         return this._servicecaller.getGetCall('Common/GetWorkHistory?uniqueid=' + unique_id);
//     }

//     getSenderTypes() {
//         return this._servicecaller.getGetCall('Common/GetSenderTypes');
//     }

//     getSenderNames(data: any) {
//         return this._servicecaller.getPostCall('Common/GetSenderNames', data);
//     }

//     hideModals() {
//         $('.modal').each(function () {
//             $(this).modal('hide');
//         });
//     }

//     ActiveTab(tab_id: string) {
//         $('.main-sidebar>ul>li.nav-li-active').removeClass('nav-li-active');
//         $('#' + tab_id).addClass('nav-li-active');
//     }

//     apply_Freeze_Headers() {
//     }

//     destroyFixedHeader() {
//     }

//     // apply_Freeze_Headers() {
//     //    let theTable: any = $("table.table-with-freezeHeader");
//     //    //freeze headers (using float-Thead jquery plugin)
//     //    theTable.floatThead({
//     //        position: 'fixed',
//     //        scrollContainer: function ($table) {
//     //            return theTable.closest('.table-responsive');
//     //        },
//     //        autoReflow: true,
//     //        debug: true
//     //    });
//     // }

//     // destroyFixedHeader() {
//     //    var theTable = $("table.table-with-freezeHeader");
//     //    theTable.floatThead('destroy');
//     // }
//     // sattar 6.21.18

//     UnsubscribeFun(_subscription: Subscription): void {
//         if (this.NullCheckFun(_subscription)) {
//             _subscription.unsubscribe();
//         }
//     }

//     NullCheckFun(obj: any): boolean {
//         if (obj != null && obj !== undefined && obj != NaN && obj !== '') {
//             return true;
//         }
//         return false;
//     }


//     voidSpace(inputChar: any): any {
//         let value: any = (inputChar.target as HTMLInputElement).value;
//         if (inputChar.which === 32) {
//             event.preventDefault();
//             return;
//         }
//     }

//     Distinct(value, index, self) {
//         return self.indexOf(value) === index;
//     }

//     getTreatmentLocationByZip(zip: string) {
//         return this._servicecaller.getGetCall('Common/GetTreatmentLocationByZip?zip=' + zip);
//     }

//     // get practices
//     getPractices(model: SmartSearchRequest): any {
//         return this._servicecaller.getPostCall('Settings/FetchPractices', model);
//     }

//     getSpecialities(model: SmartSearchRequest): any {
//         return this._servicecaller.getPostCall('Settings/FetchSpecialities', model);
//     }

//     getSmartCities(city: string) {
//         return this._servicecaller.getGetCall('Common/GetSmartCities?city=' + city);
//     }

//     getSmartStates(state: string) {
//         return this._servicecaller.getGetCall('Common/GetSmartStates?stateCode=' + state);
//     }

//     createNewObject(obj: any): any {
//         if (this.NullCheckFun(obj)) {
//             return JSON.parse(JSON.stringify(obj));
//         }
//     }

//     GetSmartProviders(searchValue: string, disciplineId: number) {
//         return this._servicecaller.getGetCall('Cases/GetSmartProviders?searchValue=' + searchValue + '&disciplineId=' + disciplineId);
//     }

//     getPSQuestionText(format: string) {
//         switch (format) {
//             case 'Old Format':
//                 return 'HQ';
//             case 'New Format':
//                 return 'that team';
//             default:
//                 return '';
//         }
//     }

//     getQAReportText(format: string) {
//         switch (format) {
//             case '':
//                 return '';
//             default:
//                 return 'Selected / Average';
//         }
//     }
//     getPSQuestionConditionImproved(format: string) {
//         switch (format) {
//             case 'Old Format':
//                 return 'Condition Improved';
//             case 'New Format':
//                 return 'Is Improved Satisfaction';
//             case 'All':
//                 return 'Is Improved Satisfaction';
//             default:
//                 return '';
//         }
//     }

//     getPSQuestionRecommend(format: string) {
//         switch (format) {
//             case 'Old Format':
//                 return 'Recommend Our Practice';
//             case 'New Format':
//                 return 'Is Referrable';
//             case 'All':
//                 return 'Is Referrable';
//             default:
//                 return '';
//         }
//     }

//     getPSQuestionCall(format: string) {
//         switch (format) {
//             case 'Old Format':
//                 return 'Call to HQ';
//             case 'New Format':
//                 return 'Is Contact Team';
//             case 'All':
//                 return 'Is Contact Team';
//             default:
//                 return '';
//         }
//     }

//     getPSQuestionResponse(format: string) {
//         switch (format) {
//             case 'Old Format':
//                 return 'Response from HQ';
//             case 'New Format':
//                 return 'Is Response Courteous';
//             case 'All':
//                 return 'Is Response Courteous';
//             default:
//                 return '';
//         }
//     }
//     isNewPSFormat(format: string) {
//         if (format == 'New Format') {
//             return true;
//         }
//         else if (format == 'All') {
//             return true;
//         }
//         else {
//             return false;
//         }
//     }

//     prventUlClose($event: MouseEvent) {
//         $event.stopImmediatePropagation();
//     }

//     convertDateTimeToString(dateTime: Date) {
//         let dateTimeString: string;
//         dateTime = dateTime == null ? null : new Date(dateTime.toString());
//         dateTimeString = dateTime == null ? '' : dateTime.toDateString();
//         return dateTimeString;
//     }

//     GetSmartPosLocations(searchValue: string) {
//         return this._servicecaller.getGetCall('Cases/GetSmartPosLocations?searchValue=' + searchValue);
//     }
//     getSmartRef(searchValue: string) {
//         return this._servicecaller.getGetCall('ClinicianSetup/GetSmartRefRegion?searchValue=' + searchValue);
//     }
//     GetSmartStates(searchText: string): any {
//         return this._servicecaller.getGetCall(`Settings/GetSmartStates?searchText=${searchText}`);
//     }
//     GetSmartClinician(obj: any) {
//         return this._servicecaller.getPostCall('Cases/GetSmartClinicain', obj);
//     }

//     setRTCaseNo(rtCaseNo: string): string {
//         let _rtCaseNo: string = '';
//         if (this.NullCheckFun(rtCaseNo)) {
//             // _rtCaseNo = '[RT: ' + rtCaseNo + ']';
//             _rtCaseNo = rtCaseNo;
//         }
//         return _rtCaseNo;
//     }

//     ReplaceAsterikInPayerName(payerName: string): string {
//         let nameWithoutAsterik: string = payerName;
//         if (this.NullCheckFun(payerName) && payerName.indexOf('*') > -1) {
//             nameWithoutAsterik = payerName.replace('*', '').trim();
//         }
//         else {
//             return payerName;
//         }
//         return nameWithoutAsterik;
//     }

//     setDOBFun(date: Date): Date {
//         // let setDate: number = 0;

//         // if (this.NullCheckFun(date) && date.getFullYear() < 100) {
//         //     //console.log(date);
//         //     setDate = date.getDate();
//         //     if (this.deviceService.browser.toLocaleLowerCase().includes("chrome")) {// GMT-0128 // GMT-0200 // GMT-1100 // GMT-1200
//         //         let dateStr: string = date.toString();
//         //         if (dateStr.toLowerCase().includes("gmt-")
//         //             && !dateStr.toLowerCase().includes("gmt-0128")
//         //             && !dateStr.toLowerCase().includes("gmt-0200")
//         //             && !dateStr.toLowerCase().includes("gmt-1100")
//         //             && !dateStr.toLowerCase().includes("gmt-1200")) {
//         //             setDate = date.getDate() + 1;
//         //         }
//         //     }

//         //     date = new Date(1900 + date.getFullYear(), date.getMonth(), setDate);
//         // }
//         // else 
//         if (this.NullCheckFun(date)) {
//             date = new Date(date.toString());
//         }
//         return date;
//     }

//     numberOnly(inputChar: any): any {
//         let value: any = (inputChar.target as HTMLInputElement).value;
//         if (inputChar.which === 46 && !value.length) {
//             event.preventDefault();
//             return;
//         }
//         if (inputChar.which === 37) {
//             event.preventDefault();
//             return;
//         }
//         if (inputChar.which === 32 && !value.length) {
//             event.preventDefault();
//             return;
//         }
//         if ((inputChar.which === 110 || inputChar.which === 190) && !value.length) {
//             event.preventDefault();
//             return;
//         }
//         if ((inputChar.which < 48 || inputChar.which > 57) && inputChar.which != 8 && inputChar.keyCode != 9 && inputChar.keyCode != 37 && inputChar.keyCode != 39) {
//             event.preventDefault();
//             return;
//         }
//     }

//     clone(obj: any) {
//         if (obj == null || typeof obj != "object") return obj;
//         var copy = obj.constructor();
//         for (let attr in obj) {
//             if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
//         }
//         return copy;
//     }

//     checkValidDateFun(date: Date, isDOB: boolean): boolean {
//         let validYear: boolean = false;

//         if (this.NullCheckFun(date)) {
//             if (typeof (date) == 'string') {
//                 date = new Date(date);
//             }
//             let enterdate: number = date.getDate();
//             let entermonth: number = date.getMonth();
//             let enteryear: number = date.getFullYear();
//             let currentyear: number = new Date().getFullYear();
//             if (this.NullCheckFun(enteryear)
//                 && this.NullCheckFun(enterdate)
//                 && this.NullCheckFun(entermonth)
//                 && (((enteryear < 1850 || enteryear > currentyear) && isDOB) || ((enteryear < 1850) && !isDOB))) {
//                 validYear = true;
//             }
//             else {
//                 validYear = false;
//             }
//         }
//         return validYear;
//     }

//     CheckOnPasteDate(e: any): boolean {
//         let validdate: boolean = false;
//         let content = e.clipboardData.getData('text/plain');
//         let date_regex = /^([0-9])([0-9])?(\/)([0-9])([0-9])?(\/)(\d{4})$/gm;
//         //let date_regex = /^(0[1-9]|1[012])[\/](0[1-9]|[12][0-9]|3[01])[\/](19|20)\d\d$/gm;   //mm/dd/yyyy
//         //let date_regex = /(^(((0[1-9]|1[012])[\/](0[1-9]|1[0-9]|2[0-8]))|((0[13578]|1[02])[\/](29|30|31))|((0[4,6,9]|11)[\/](29|30)))[\/](18[5-9])\d$|(19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)$/gm;   //mm/dd/yyyy
//         if (date_regex.test(content)) {
//             validdate = true;
//         }
//         return validdate;
//     }

//     //check if search button is disabled then no action performed on enter key
//     CheckSearchBtnDisabled(btnID: string): boolean {
//         let IS_BTN_DISABLED: boolean = false;
//         let saveButton: HTMLElement = document.getElementById(btnID) as HTMLElement;
//         if (this.NullCheckFun(saveButton)) {
//             let isFormDisabled: boolean = saveButton.hasAttribute('disabled');
//             if (isFormDisabled) {
//                 IS_BTN_DISABLED = true;
//             }
//             else {
//                 IS_BTN_DISABLED = false;
//             }
//         }
//         return IS_BTN_DISABLED;
//     }

//     getEncodedString(val: string): string {
//         return encodeURIComponent(val);
//     }

//     DateIsActive(date: Date): boolean {
//         let currentDate: Date = new Date();
//         if (this.NullCheckFun(date)) {
//             date = new Date(date);
//             date.setHours(0, 0, 0, 0);
//             currentDate = new Date(currentDate);
//             currentDate.setHours(0, 0, 0, 0);
//             if (date >= currentDate) {
//                 return true;
//             }
//         }
//         return false;
//     }

//     toTitleCase(str): string {
//         if (this.NullCheckFun(str)) {
//             return str.replace(
//                 /\w\S*/g,
//                 function (txt) {
//                     return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
//                 }
//             );
//         }
//         else {
//             return str;
//         }
//     }

//     // Lower_case_Source_Name(sourcename : string): boolean{
//     //     let is_strategic_account : boolean = false;
//     //     if(this.NullCheckFun(sourcename)){
//     //         if(sourcename.trim().replace('(', '').replace(')', '').replace(' ', '').replace('-', '') == '8555232328'){    //sourcename.toLowerCase() == '' || 
//     //             is_strategic_account = true;
//     //         } 
//     //     }
//     //     return is_strategic_account;
//     // }

//     CheckRightsandRoute(url: string): string {
//         let name: string;
//         if (this.NullCheckFun(url) && this.globalSettingService.SearchRightList('VIEW ORIGINAL QUEUE') && url.includes("OriginalQueue")) {
//             name = 'OriginalQueue';
//         }
//         else if (this.NullCheckFun(url) && this.globalSettingService.SearchRightList('VIEW SETTINGS') && url.includes("UserManagement")) {
//             name = 'UserManagement';
//         }
//         else if (this.NullCheckFun(url)) {
//             if (this.globalSettingService.SearchRightList('VIEW DASHBOARD') && url.includes("Dashboard")) {
//                 name = 'Dashboard';
//             } else if (this.globalSettingService.SearchRightList('VIEW ORIGINAL QUEUE') && url.includes("OriginalQueue")) {
//                 name = 'OriginalQueue';
//             } else if (this.globalSettingService.SearchRightList('VIEW UNASSIGNED QUEUE') && url.includes("UnassignedQueue")) {
//                 name = 'UnassignedQueue';
//             } else if (this.globalSettingService.SearchRightList('View Assigned Queue') && url.includes("AssignedQueue")) {
//                 name = 'AssignedQueue';
//             }
//             else if (this.globalSettingService.SearchRightList('View Completed Queue') && url.includes("CompletedQueue")) {
//                 name = 'CompletedQueue';
//             } else if (this.globalSettingService.SearchRightList('VIEW SUPERVISOR QUEUE') && url.includes("SupervisorWork")) {
//                 name = 'SupervisorWork';
//             } else if (this.globalSettingService.SearchRightList('VIEW SEARCH REFERRAL') && url.includes("SearchOrders")) {
//                 name = 'SearchOrders';
//             } else if (this.globalSettingService.SearchRightList('VIEW SETTINGS') && url.includes("Settings")) {
//                 name = 'Settings';
//             } else if (this.globalSettingService.SearchRightList('PATIENT MAINTENANCE') && url.includes("PatientMaintenance")) {
//                 name = 'PatientMaintenance';
//             } else if (this.globalSettingService.SearchRightList('View Request For Referral') && url.includes("RequestForOrder")) {
//                 name = 'RequestForOrder';
//             } else if (this.globalSettingService.SearchRightList('VIEW REPORTING') && url.includes("Reporting")) {
//                 name = 'Reporting';
//             } else if ((this.globalSettingService.SearchRightList('VIEW TASKS') || this.globalSettingService.SearchRightList('ADD/EDIT TASKS')) && url.includes("Tasks")) {
//                 name = 'Tasks';
//             }
//             else if (this.globalSettingService.SearchRightList('VIEW PATIENT HELPDESK') && url.includes("FOXPHD")) {
//                 name = 'FOXPHD';
//             }
//             else if (this.globalSettingService.SearchRightList('VIEW RECONCILIATION CP') && url.includes("ReconciliationsCp")) {
//                 name = 'ReconciliationsCp';
//             }
//             else if (this.globalSettingService.SearchRightList('VIEW PATIENT SURVEY') && url.includes("PatientSurvey")) {
//                 name = 'PatientSurvey';
//             }
//             else if ((this.globalSettingService.SearchRightList('EVALUATION SETUP') ||
//                 this.globalSettingService.SearchRightList('PERFORM AN AUDIT') ||
//                 this.globalSettingService.SearchRightList('QA REPORT')) && url.includes("QualityAssurance")) {
//                 name = 'QualityAssurance';
//             }
//             else if (this.globalSettingService.SearchRightList('VIEW SCHEDULER')
//                 && url.includes("Scheduler")) {
//                 name = 'Scheduler';
//             }
//             else if (this.globalSettingService.SearchRightList('VIEW REFERRALS')
//                 && url.includes("viewReferral")) {
//                 name = 'viewReferral';
//             }
//             else if ((this.globalSettingService.SearchRightList('VIEW TASKS') || this.globalSettingService.SearchRightList('ADD/EDIT TASKS')) && url.includes("Notifications")) {
//                 name = 'Notifications';
//             }
//             else if (url.includes("IndexedQueue")) {
//                 name = '';
//             }
//             else {
//                 name = '';
//             }
//         }
//         return name;
//     }

//     // Description: This function is trigger to set question text according to selected formate(Question # 1)
//     getPSQuestion1Text(format: string) {
//         switch (format) {
//             case 'Old Format':
//                 return 'Do you feel your condition (or the condition of your family member/friend) improved to your satisfaction due to the (PT, OT and SLP) services you received from';
//             case 'New Format':
//                 return 'Do you feel your function improved due to the (PT,OT and SLP) services you received from';
//             default:
//                 return '';
//         }
//     }

//     // Description: This function is trigger to set question text according to selected formate(Question # 1)
//     getPSQuestionProvider(format: string, provider: string) {
//         switch (format) {
//             case 'Old Format':
//                 return ' Clinician?';
//             case 'New Format':
//                 return ' ' + provider;
//             default:
//                 return '';
//         }
//     }

//     // Description: This function is trigger to set question text according to selected formate(Question # 2)
//     getPSQuestion2Experiences(format: string) {
//         switch (format) {
//             case 'Old Format':
//                 return ' experience';
//             case 'New Format':
//                 return ' experiences ';
//             default:
//                 return '';
//         }
//     }

//     // Description: This function is trigger to set question text according to selected formate(Question # 2)
//     getPSQuestion2Text(format: string) {
//         switch (format) {
//             case 'Old Format':
//                 return ' Clinician would you refer our practice to a friend or family member?';
//             case 'New Format':
//                 return ' Therapist would you refer FOX to a friend or family member?';
//             default:
//                 return '';
//         }
//     }
// }




