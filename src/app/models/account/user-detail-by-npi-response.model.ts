import { ResponseModel } from './response-model';
export class UserDetailsByNPIResponseModel extends ResponseModel {
    userDetailByNPIModel: UserDetailByNPIModel;
}
export class FOX_TBL_ORDERING_REF_SOURCE {
    SOURCE_ID: number;
    CODE: string;
    FIRST_NAME: string;
    LAST_NAME: string;
    TITLE: string;
    ADDRESS: string;
    ADDRESS_2: string;
    CITY: string;
    STATE: string;
    ZIP: string;
    PHONE: string;
    FAX: string;
    REFERRAL_REGION: string;
    NPI: string;
    ORGANIZATION: string;
    ACO: string;
    CREATED_BY: string;
    CREATED_DATE: string;
    MODIFIED_BY: string;
    MODIFIED_DATE: string;
    DELETED: string;
    PRACTICE_CODE: string;
    Practice_Name: string;
}
export class UserDetailByNPIModel {
    result_count: number;
    results: Result[];
}

export class Taxonomy {
    state: string;
    code: string;
    primary: boolean;
    license: string;
    desc: string;
}
export class Address {
    city: string;
    address_2: string;
    telephone_number: string;
    fax_number: string;
    state: string;
    postal_code: string;
    address_1: string;
    country_code: string;
    country_name: string;
    address_type: string;
    address_purpose: string;
}

export class Identifier {
    code: string;
    issuer: string;
    state: string;
    identifier: string;
    desc: string;
}
export class OtherName {
    organization_name: string;
    code: string;
    type: string;
}

export class Basic {
    status: string;
    credential: string;
    first_name: string;
    last_name: string;
    middle_name: string;
    name: string;
    gender: string;
    sole_proprietor: string;
    last_updated: string;
    enumeration_date: string;
}
export class Result {
    taxonomies: Taxonomy[];
    addresses: Address[];
    created_epoch: number;
    identifiers: Identifier[];
    other_names: OtherName[];
    number: number;
    last_updated_epoch: number;
    basic: Basic;
    enumeration_type: string;
}