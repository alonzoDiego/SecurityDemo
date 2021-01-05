import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './vistas/dashboard/dashboard.component'
import { GraduateCustomComponent } from './vistas/graduate-custom/graduate-custom.component';
import { GraduateEditComponent } from './vistas/graduate-edit/graduate-edit.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

