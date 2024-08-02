import { Injectable } from '@angular/core';

@Injectable()
export class DateUtility {
    months: any;
    constructor() {
        this.months = ["01", "02", "03", "04", "05", "06", "07",
            "08", "09", "10", "11", "12"];
    }
    FormatDateTime(unformattedDate: Date): string {
        if (unformattedDate != null) {
            var date = new Date(unformattedDate.toString());
            var formattedate = this.months[date.getMonth()] + "/" + date.getDate() + "/" + date.getFullYear();
            var formattedTime = date.toLocaleString('en-US', {  hour: 'numeric', minute: 'numeric', hour12: true });
            return formattedate + " " + formattedTime;

            //var dateOnly = new Date(date.toDateString());
            //var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
            //var am_pm = date.getHours() >= 12 ? "PM" : "AM";
            //hours = hours < 10 ? 0 + hours : hours;
            //var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes().toString();
            //var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds().toString();
            //var formattedTime = hours + ":" + minutes + " " + am_pm;
            //var formattedTime = dt.getHours() + ":" + dt.getMinutes() + " " + (dt.getHours() >= 12 ? "PM" : "AM");
        }
        else
            return "";
    }
}


