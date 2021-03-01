import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/modelos/login-user';
import { AlertsService } from 'src/app/servicios/alerts/alerts.service';
import { AuthService } from '../../../servicios/auth/auth.service';
import { TokenService } from '../../../servicios/token/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isSignedIn = false;
  loginUser: LoginUser;
  roles: string[];
  hide = true;

  constructor(private authService: AuthService,
              private tokenService: TokenService,
              private alertService: AlertsService,
              private router: Router) { }

  formLogin = new FormGroup({
    user: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  ngOnInit(): void {

    if(this.tokenService.getToken()){
      this.isSignedIn = true
      this.roles = this.tokenService.getAuthoritites()
    }
  }

  onSubmit() {
    const{user, password} = this.formLogin.value
    this.loginUser = new LoginUser(user, password)
    this.authService.login(this.loginUser).subscribe(data =>{
      this.isSignedIn = true

      this.tokenService.setToken(data.token)
      this.tokenService.setUsername(data.username)
      this.tokenService.setAuthoritites(data.authorities)
      this.roles = data.authorities

      this.router.navigate(['/home'])
    }, err =>{
      this.isSignedIn = false
      this.alertService.error("Inconrrect fields: " + err.error.message)
    });
  }

  onGoodleLogin(){
    console.log("Proximamente...")
  }

}
