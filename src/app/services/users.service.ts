import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  id: string = '';
  authtoken = localStorage.getItem('token');

  constructor(private http: HttpClient) {
    this.getid();
  }

  private getid(): void {
    if (this.authtoken) {
      try {
        const decodedToken = jwt_decode.jwtDecode(this.authtoken) as any;
        if (decodedToken && decodedToken.id) {
          this.id = decodedToken.id;
          console.log('Decoded ID:', this.id);
          console.log('Decoded ID:', decodedToken);

        } else {
          console.error('ID not found in token');
        }
      } catch (error) {
        console.error('Failed to decode token', error);
      }
    } else {
      console.error('Token not found in local storage');
    }
  }

  createuser(name: string, lastname: string, email: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authtoken}`
    });
    const body = { name, lastname, email };
    return this.http.post(`http://localhost:3000/users/${this.id}/add`, body, { headers }).pipe(
      tap(response => {
        console.log('User added successfully:', response);
        return response;
      }),
      catchError(error => {
        console.error('Error adding user:', error);
        return throwError(error);
      })
    );
  }

  getuser(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authtoken}`
    });
    return this.http.get(`http://localhost:3000/users/allbyuser/${this.id}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  updateuser(iduser: string, name: string, lastname: string, email: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authtoken}`,
      'Content-Type': 'application/json'
    });

    const body = { name, lastname, email };

    return this.http.put(`http://localhost:3000/users/${iduser}`, body, { headers }).pipe(
      tap(response => console.log('User updated successfully:', response)),
      catchError(error => {
        console.error('Error updating user:', error);
        return throwError(error);
      })
    );
  }

  deleteuser(iduser: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authtoken}`
    });

    return this.http.delete(`http://localhost:3000/users/${this.id}/${iduser}`, { headers }).pipe(
      tap(response => console.log('User deleted successfully:', response)),
      catchError(error => {
        console.error('Error deleting user:', error);
        return throwError(error);
      })
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(error.message || 'Server error');
  }
}
