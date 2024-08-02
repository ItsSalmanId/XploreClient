import { ResponseModel } from './response-model';
import { FOX_TBL_IDENTIFIER } from './fox-tbl-identifier.model';

export class SmartIdentifierResponseModel extends ResponseModel {
    fox_tbl_identifier: FOX_TBL_IDENTIFIER[];
}