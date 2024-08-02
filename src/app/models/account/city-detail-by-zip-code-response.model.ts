import { Zip_City_State } from './zip-city-state.model';
import { ResponseModel } from './response-model';
export class CityDetailByZipCodeResponseModel extends ResponseModel {
    zip_city_state: Zip_City_State[];
}