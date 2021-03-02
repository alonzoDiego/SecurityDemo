import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class GradGuardsService implements CanActivate{

  realRole: string

  constructor(private tokeService: TokenService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectRole = route.data.expectRole;
    const roles = this.tokeService.getAuthoritites();

    this.realRole = 'user';
    roles.forEach(role=>{
      if(role === 'ROLE_ADMIN'){
        this.realRole = 'admin'
      }
    })
    if(!this.tokeService.getToken() || expectRole.indexOf(this.realRole) === -1){
      this.router.navigate(['/home'])
      return false
    }
    return true
  }
}
