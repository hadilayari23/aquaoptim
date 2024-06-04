import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { JwtHelperService,  } from '@auth0/angular-jwt';
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  Role:string=''
  constructor(private http: HttpClient) {
    const item = localStorage.getItem('token');
    console.log(item); 

    if (item) {
      try {
        // Decode the token
        const decodedToken = jwt_decode.jwtDecode<any>(item);
        console.log(decodedToken);
      
        // Assuming 'roles' is a property in the decoded token
        this.Role = decodedToken.roles;
        console.log(this.Role);
      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    }
  }
   
  login(email:string,pass:string): Observable<any> {
    const body ={email,pass}
    return this.http.post('http://localhost:3000/auth/signin', body);
  }
  public isAuthenticated() : boolean {
    const token = localStorage.getItem('token');
    const helper = new JwtHelperService();
    const isExpired = helper.isTokenExpired(token);
    return !isExpired;
  }
  getRole() {
    return this.Role;
  }

  
}
