import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ListaGraduadosI } from '../../modelos/listaGraduados.interface';
import { Observable, Observer, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url:string = "http://localhost:8080/";
  private refresh = new Subject<void>()

  constructor(private http:HttpClient) { }

  get refreshTable(){
    return this.refresh;
  }

  getAll(): Observable<ListaGraduadosI[]>{
    let direccion = this.url + "api/graduates";
    return this.http.get<ListaGraduadosI[]>(direccion);
  }

  addNewGraduate(graduado: ListaGraduadosI): Observable<ListaGraduadosI>{
    let direccion = this.url + "api/graduates";
    return this.http.post<ListaGraduadosI>(direccion, graduado);
  }

  getGraduate(id): Observable<ListaGraduadosI>{
    let direccion = this.url + "api/graduates/" + id;
    return this.http.get<ListaGraduadosI>(direccion);
  }

  putGraduate(form: ListaGraduadosI): Observable<ListaGraduadosI>{
    let direccion = this.url + "api/graduates";
    return this.http.put<ListaGraduadosI>(direccion, form);
  }

  deleteGraduate(id): Observable<ListaGraduadosI>{
    let direccion = this.url + "api/graduates/" + id;
    return this.http.delete<ListaGraduadosI>(direccion).pipe(
      tap(() =>{
        this.refresh.next();
      })
    );
  }

}
