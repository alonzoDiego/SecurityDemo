import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './vistas/dashboard/dashboard.component';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { GraduateCustomComponent } from './vistas/graduate-custom/graduate-custom.component';
import { ApiService } from './servicios/conexion/api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { GraduateEditComponent } from './vistas/graduate-edit/graduate-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    GraduateCustomComponent,
    GraduateEditComponent
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
