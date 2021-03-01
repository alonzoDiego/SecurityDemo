import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewUser } from '../../modelos/new-user';
import { LoginUser } from '../../modelos/login-user';
import { Jwt } from '../../modelos/jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl = "http://localhost:8080/auth/"

  constructor(private http: HttpClient) { }

  public register(newUser: NewUser): Observable<any>{ //es any porq en el controller del api devuelve un generico
    return this.http.post<any>(this.authUrl + "nuevo", newUser)
  }

  public login(loginUser: LoginUser): Observable<Jwt>{
    return this.http.post<Jwt>(this.authUrl + "login", loginUser)
  }
}
