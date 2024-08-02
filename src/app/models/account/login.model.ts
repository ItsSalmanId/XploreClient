
export class LoginViewModel {

  constructor() {

  }
  public username: string;
  public password: string;
  public grant_type = 'password';
  public encodedResponse: string = '';
  public isTalkRehab: boolean;
  public utcDateTime:string;
  public isTimeCompleted:boolean;
  //public grant_api:boolean = false; //this used for mfa users authontication 
}
