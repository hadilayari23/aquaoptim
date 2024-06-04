import { Component } from '@angular/core';
import { SideservicesService } from '../services/sideservices.service';
import * as jwt_decode from "jwt-decode";
import { Router } from '@angular/router';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css']
})
export class SideComponent {
  imageURL = 'assets/img/1.svg';
  Role: string = '';

  constructor(private serviceSide: SideservicesService, private router:Router) {}

  ngOnInit(): void {
    // Get the token from localStorage
    const item = this.serviceSide.getItem('token');
    console.log(item); 

    if (item) {
      // Decode the token
      const decodedToken = jwt_decode.jwtDecode<any>(item);
      console.log(decodedToken);
      
      // Assuming 'status' is a property in the decoded token
      this.Role = decodedToken.roles;
      console.log(this.Role)
    }
    
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
