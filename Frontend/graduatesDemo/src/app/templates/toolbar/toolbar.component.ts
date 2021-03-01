import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from 'src/app/vistas/authentication/register/register.component';
import { TokenService } from '../../servicios/token/token.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  username: string

  constructor(private dialog: MatDialog, private tokenService: TokenService) { }

  ngOnInit(): void {
  }

  openRegister(){
    this.dialog.open(RegisterComponent);
  }

}
