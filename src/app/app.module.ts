import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { CommonModule } from '@angular/common';  // Ajouter cette ligne

import { UserService } from './services/user.service';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { UserComponent } from './Components/Dashboards/user/user.component';
import { AdminComponent } from './Components/Dashboards/admin/admin.component';
import { AuthGuard } from './auth.guard';
import { DasboardHeaderComponent } from './shared/dasboard-header/dasboard-header.component';

const config: SocketIoConfig = { url: 'http://localhost:4200', options: {} };
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirection vers la page de connexion
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin-dashboard', component: AdminComponent, canActivate: [AuthGuard] }, // Protégé par AuthGuard
  { path: 'user-dashboard', component: UserComponent, canActivate: [AuthGuard] }, // Protégé par AuthGuard
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    UserComponent,
    AdminComponent,
    DasboardHeaderComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    SocketIoModule.forRoot(config),

  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }



