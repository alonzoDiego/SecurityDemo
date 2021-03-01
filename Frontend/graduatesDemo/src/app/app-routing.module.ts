import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './vistas/graduates/dashboard/dashboard.component'
import { GraduateCustomComponent } from './vistas/graduates/graduate-custom/graduate-custom.component';
import { GraduateEditComponent } from './vistas/graduates/graduate-edit/graduate-edit.component';
import { LoginComponent } from './vistas/authentication/login/login.component';
import { RegisterComponent } from './vistas/authentication/register/register.component';
import { HomeComponent } from './vistas/home/home.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'nuevo',
    component: GraduateCustomComponent
  },
  {
    path: 'editar/:id',
    component: GraduateEditComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

