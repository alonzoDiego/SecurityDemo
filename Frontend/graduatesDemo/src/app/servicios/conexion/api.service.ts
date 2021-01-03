import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ListaGraduadosI } from '../../modelos/listaGraduados.interface'
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url:string = "http://localhost:8080/";

  constructor(private http:HttpClient) { }

  getAll(): Observable<ListaGraduadosI[]>{
    let direccion = this.url + "api/graduates";
    return this.http.get<ListaGraduadosI[]>(direccion);
  }
}
