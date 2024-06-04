import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { DashAdminComponent } from './dash-admin/dash-admin.component';
import { UsersComponent } from './users/users.component';
import { DevicesComponent } from './devices/devices.component';
import { DetailComponent } from './detail/detail.component';
import { AuthGuard } from './guard/auth.guard';
import { LoginGuard } from './guard/login.guard';
import { SuperAdminGuard } from './guard/superadmin.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AdminGuard } from './guard/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: AuthComponent, canActivate: [LoginGuard] },
  { path: 'dashboard', component: DashAdminComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard,SuperAdminGuard] },
  { path: 'devices', component: DevicesComponent, canActivate: [AuthGuard,AdminGuard] },
  { path: 'device/detail', component: DetailComponent, canActivate: [AuthGuard,AdminGuard] },
  { path: 'forbidden', component:ForbiddenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
