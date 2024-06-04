import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class SuperAdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.getRole()=='super admin') {
      return true;
    } else {
      this.router.navigateByUrl('/forbidden');
      return false;
    }
  }
}
