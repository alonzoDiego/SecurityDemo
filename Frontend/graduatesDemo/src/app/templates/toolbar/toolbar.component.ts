import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from 'src/app/vistas/authentication/register/register.component';
import { Router } from '@angular/router';
import { TokenService } from '../../servicios/token/token.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  public username:String = this.tokenService.getUsername();
  isLogged = false;

  constructor(private dialog: MatDialog, private tokenService: TokenService, private router: Router) { }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged = true;
    }else{
      this.isLogged = false;
    }
  }

  openRegister(){
    this.dialog.open(RegisterComponent);
  }

  onLogout(){
    this.tokenService.logOut();
    this.router.navigate(['/login'])
  }

}
