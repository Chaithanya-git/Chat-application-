import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cookie } from 'ng2-cookies/ng2-cookies';

//import 'rxjs/add/operator/catch';
//import 'rxjs/add/operator/do';
//import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from "@angular/common/http";

console.log("app service called");

@Injectable()
export class AppService {

  private url =  'http://localhost:3000/api/v1/users';

  constructor(
    public http: HttpClient
  ) {

    

  } // end constructor  
  

  public getUserInfoFromLocalstorage = () => {

    return JSON.parse(localStorage.getItem('userInfo') || '{}');

  } // end getUserInfoFromLocalstorage


  public setUserInfoInLocalStorage = (data: any) =>{

    localStorage.setItem('userInfo', JSON.stringify(data))


  }

  public signupFunction(data: { firstName: string; lastName: string; mobile: string; email: string; password: string; }): Observable<any> {

    const params = new HttpParams()
      .set('firstName', data.firstName)
      .set('lastName', data.lastName)
      .set('mobile', data.mobile)
      .set('email', data.email)
      .set('password', data.password);
      

    return this.http.post(`${this.url}/signup`, params);

  } // end of signupFunction function.

  public signinFunction(data: { email: string; password: string; }): Observable<any> {

    const params = new HttpParams()
      .set('email', data.email)
      .set('password', data.password)
      .set('authToken', JSON.parse(localStorage.getItem('authToken') || '{}'));

    return this.http.post(`${this.url}/login`, params);
  } // end of signinFunction function.

  
  public logout(): Observable<any> {

    const params = new HttpParams()
      .set('authToken', Cookie.get('authToken'))

    return this.http.post(`${this.url}/logout`, params);

  } // end logout function

  

  private handleError(err: HttpErrorResponse) {

    let errorMessage = '';

    if (err.error instanceof Error) {

      errorMessage = `An error occurred: ${err.error.message}`;

    } else {

      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;

    } // end condition *if

    console.error(errorMessage);

    return Observable.throw(errorMessage);

  }  // END handleError

}
