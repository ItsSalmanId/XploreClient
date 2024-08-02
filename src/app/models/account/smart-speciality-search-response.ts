import { ResponseModel } from './response-model';
import { Speciality } from './speciality.model'
export class SmartSpecialitySearchResponseModel extends ResponseModel {
    specialities: Speciality[];
}