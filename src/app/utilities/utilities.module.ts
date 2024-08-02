import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericUtility } from './generic-utility';
import { FileDownloader } from './file-downloader';
import { DateUtility } from './date-util';
import { ExportUtility } from './export-util';

@NgModule({
  imports: [
    CommonModule
  ],
  providers:[
    GenericUtility,
    FileDownloader,
    DateUtility,
    ExportUtility
  ],
  declarations: []
})
export class UtilitiesModule { }
