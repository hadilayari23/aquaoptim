import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  constructor(private authService: AuthService , private route:Router) {}
  imageURL = 'assets/img/1.png';
  userform = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]),
    pass: new FormControl('', Validators.required)
  });

  onSubmit() {
    if (this.userform.valid) {
      const email = this.userform.get('email')?.value as string;
      const pass = this.userform.get('pass')?.value as string;
      this.authService.login(email, pass).subscribe(
        (response) => {
          console.log(response); // Afficher la réponse dans la console
          localStorage.setItem('token',response.data.accessToken)
          this.route.navigateByUrl('/dashboard')
          
        },
        (error) => {
          console.error('Une erreur est survenue:', error); // Afficher l'erreur dans la console
          // Gérer les erreurs ici, par exemple, afficher un message d'erreur à l'utilisateur
        }
      );
    }
  }
  
}
