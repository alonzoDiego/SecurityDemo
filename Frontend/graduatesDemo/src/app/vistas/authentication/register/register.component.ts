import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isSignedIn = false;
  hide = true;

  constructor() { }

  formRegister = new FormGroup({
    name: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    user: new FormControl(''),
    password: new FormControl('')
  })

  ngOnInit(): void {
  }

  onRegister(){

  }

}
