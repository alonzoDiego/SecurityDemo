import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NewUser } from 'src/app/modelos/new-user';
import { AlertsService } from 'src/app/servicios/alerts/alerts.service';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { TokenService } from 'src/app/servicios/token/token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isSignedIn = false;
  newUser: NewUser;
  hide = true;

  constructor(private authService: AuthService,
              private tokenService: TokenService,
              private alertService: AlertsService,) { }

  formRegister = new FormGroup({
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    user: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isSignedIn = true
    }
  }

  onRegister(){
    const{name, lastName, email, user, password} = this.formRegister.value
    this.newUser = new NewUser(name, lastName, email, user, password)
    this.authService.register(this.newUser).subscribe(data =>{
      this.alertService.success("Account created successfully!!")
    }, err =>{
      this.alertService.error("Inconrrect fields: " + err.error) //.error para que agarre los mensajes del controlador
    });
  }

}
