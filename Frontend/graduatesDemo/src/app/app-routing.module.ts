import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './vistas/graduates/dashboard/dashboard.component'
import { GraduateCustomComponent } from './vistas/graduates/graduate-custom/graduate-custom.component';
import { GraduateEditComponent } from './vistas/graduates/graduate-edit/graduate-edit.component';
import { LoginComponent } from './vistas/authentication/login/login.component';
import { RegisterComponent } from './vistas/authentication/register/register.component';
import { HomeComponent } from './vistas/home/home.component';
import { GradGuardsService as guard } from './servicios/guards/grad-guards.service';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
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
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [guard], data: {expectRole: ['admin', 'user']}
  },
  {
    path: 'nuevo',
    component: GraduateCustomComponent,
    canActivate: [guard], data: {expectRole: ['admin']}
  },
  {
    path: 'editar/:id',
    component: GraduateEditComponent,
    canActivate: [guard], data: {expectRole: ['admin']}
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

