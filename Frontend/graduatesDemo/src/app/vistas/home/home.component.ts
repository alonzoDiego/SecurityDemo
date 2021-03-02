import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/servicios/token/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLogged = false

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged = true
    }else{
      this.isLogged = false
    }
  }

}
