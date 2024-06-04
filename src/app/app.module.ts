import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashAdminComponent } from './dash-admin/dash-admin.component';
import { SideComponent } from './side/side.component';
import { UsersComponent } from './users/users.component';
import { DevicesComponent } from './devices/devices.component';
import { DetailComponent } from './detail/detail.component';
import { LineComponent } from './charts/line/line.component';
import { AreaComponent } from './charts/area/area.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
// Add these two
import { LottieModule } from 'ngx-lottie'; // add this line

export function playerFactory() { // add this line
  return import('lottie-web'); // add this line
} 

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DashAdminComponent,
    SideComponent,
    UsersComponent,
    DevicesComponent,
    DetailComponent,
    LineComponent,
    AreaComponent,
    ForbiddenComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
   ReactiveFormsModule,
   NgApexchartsModule,
   LottieModule.forRoot({ player: playerFactory}) // add this line
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
