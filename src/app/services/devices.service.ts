import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as jwt_decode from "jwt-decode";
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Device } from '../interfaces/Device';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {
  private id: string = '';

  constructor(private http: HttpClient) { 
    this.getid();
  }

  private getid(): void {
    const item = localStorage.getItem('token');
    if (item) {
      try {
        const decodedToken = jwt_decode.jwtDecode(item) as any;
        if (decodedToken && decodedToken.id) {
          this.id = decodedToken.id;
          console.log(this.id);
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

  getdevices(): Observable<any> {
    if (this.id) {
      return this.http.get(`http://localhost:3000/devices/${this.id}/all`).pipe(
        catchError(this.handleError)
      );
    } else {
      console.error('ID is not defined');
      return throwError('ID is not defined');
    }
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(error.message || 'Server error');
  }
  adddevices(name: string, deveui: string, type: string) {
    const body = { name, deveui, type };
    const authtoken=localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authtoken}`  // Replace 'YOUR_AUTH_TOKEN' with the actual token
    });
  
    if (this.id) {
      return this.http.post(`http://localhost:3000/devices/${this.id}/add`, body, { headers }).pipe(
        tap(response => console.log('Device added successfully:', response)),
        catchError(error => {
          console.error('Error adding device:', error);
          return throwError(error);
        })
      );
    } else {
      console.error('ID is not defined');
      return throwError('ID is not defined');
    }
  }
  deleteDevice(iddev:string){
    const authtoken=localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authtoken}`  // Replace 'YOUR_AUTH_TOKEN' with the actual token
    });
    if (this.id) {
      return this.http.delete(`http://localhost:3000/devices/${this.id}/${iddev}`, { headers }).pipe(
        tap(response => console.log('Device Deleted successfully:', response)),
        catchError(error => {
          console.error('Error adding device:', error);
          return throwError(error);
        })
      );
    } else {
      console.error('ID is not defined');
      return throwError('ID is not defined');
    }

  }



  updateDevice(iddev: string, name: string, deveui: string, type: string) {
    const authtoken = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authtoken}`,
      'Content-Type': 'application/json'
    });
  
    const body = {
      name: name,
      deveui: deveui,
      type: type
    };
  
    return this.http.put(`http://localhost:3000/devices/${iddev}`, body, { headers }).pipe(
      tap(response => console.log('Device updated successfully:', response)),
      catchError(error => {
        console.error('Error updating device:', error);
        return throwError(error);
      })
    );
  }
  
  }
