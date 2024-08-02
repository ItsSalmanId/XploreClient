import { DateUtility } from './date-util';
import { Injectable } from '@angular/core';
declare var $: any;
@Injectable()
export class ExportUtility {
    constructor(private _dateUtility: DateUtility) {

    }

    ConvertToCSV(objArray, queueObject): string {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        var str = '';
        var row = "";
        for (var index in objArray[0]) {
            //Now convert each value to string and comma-separated
            if (this.checkColumnExist(index, queueObject)) {
                row += index + ',';
            }
        }
        row = row.slice(0, -1);
        //append Label row with line break
        str += row + '\r\n';

        for (var i = 0; i < array.length; i++) {
            var line = '';
            for (var index in array[i]) {
                if (this.checkColumnExist(index, queueObject))  {
                    if (line != '') { line += ',' }
                    if (index.toLowerCase().indexOf("date") >= 0) {
                        var formattedDate = this._dateUtility.FormatDateTime(array[i][index]);
                        line += formattedDate;
                    }
                    else if (array[i][index] == null) {
                        line += " ";
                    }
                    else if ((array[i][index]).toString().indexOf(',') >= 0) {
                        var commaString = array[i][index];
                        var UnCommaString = commaString.replace(/,/g, "");
                        line += UnCommaString;
                    }
                    else {
                        if ((typeof array[i][index]) == 'boolean') {
                            if (array[i][index] == true) {
                                line += 'Yes';
                            }
                            else if (array[i][index] == false) {
                                line += 'No';
                            }
                            else {
                                line += '';
                            }
                        }
                        else {
                            line += array[i][index];
                        }
                    }
                }
            }
            str += line + '\r\n';
        }
        return str;
    }

    checkColumnExist(col, obj): boolean {
        for (var key in obj) {
            if (key == col && obj[key] == true) {
                return true;
            }
        }
        return false;
    }

    ConvertToCSVStatic(objArray): string {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        var str = '';
        var row = "";
        for (var index in objArray[0]) {
            //Now convert each value to string and comma-separated
           
            if (index.toLowerCase().indexOf("TOTAL_RECORDS") >= 0) {
            } 
            else {
                row += index + ',';
            }
            
        }
        row = row.slice(0, -1);
        //append Label row with line break
        str += row + '\r\n';

        for (var i = 0; i < array.length; i++) {
            var line = '';
            for (var index in array[i]) {
              
                    if (line != '') { line += ',' }
                    if (index.toLowerCase().indexOf("date") >= 0) {
                        var formattedDate = this._dateUtility.FormatDateTime(array[i][index]);
                        line += formattedDate;
                    }
                    else if (array[i][index] == null) {
                        line += " ";
                    }
                    else if ((array[i][index]).toString().indexOf(',') >= 0) {
                        var commaString = array[i][index];
                        var UnCommaString = commaString.replace(/,/g, "");
                        line += UnCommaString;
                    }
                    else if (index.toLowerCase().indexOf("TOTAL_RECORDS") >= 0) {
                    }

                    else {
                        line += array[i][index];
                    }
               
            }
            str += line + '\r\n';
        }
        return str;
    }

    downloadCSV(csvData: string, originalColumnsName: string, replaceColumnsName: string, fileName: string) {
        var csvRows = csvData.split('\n');
        //csvRows[0] = csvRows[0].replace(originalColumnsName, replaceColumnsName);
        
        
        csvRows[0]=replaceColumnsName;



        var csvDatatemp = '';
        var temp = '';
        for (var i = 0; i < csvRows.length; i++) {
            temp = csvRows[i] + '\n';
            csvDatatemp = csvDatatemp + temp;
        }
        var fileName = fileName + new Date().getTime() + ".csv"; /* your file name*/
        var a = document.createElement("a");
        a.setAttribute('style', 'display:none;');
        document.body.appendChild(a);
        var blob = new Blob([csvDatatemp], { type: 'text/csv' });
        var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        return 'success';
    }
}