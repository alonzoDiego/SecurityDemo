import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './vistas/graduates/dashboard/dashboard.component';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { GraduateCustomComponent } from './vistas/graduates/graduate-custom/graduate-custom.component';
import { ApiService } from './servicios/conexion/api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { GraduateEditComponent } from './vistas/graduates/graduate-edit/graduate-edit.component';
import { LoginComponent } from './vistas/authentication/login/login.component';
import { RegisterComponent } from './vistas/authentication/register/register.component';
import { ToolbarComponent } from './templates/toolbar/toolbar.component';
import { HomeComponent } from './vistas/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    GraduateCustomComponent,
    GraduateEditComponent,
    LoginComponent,
    RegisterComponent,
    ToolbarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
