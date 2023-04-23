import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from "./../services/Usuario/user.service";
import { AuthService } from "./../services/auth.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UsersGuardGuard implements CanActivate {

  
  constructor(private userService: UserService,private router: Router,private authservice: AuthService){

  }

  canActivate():boolean{
    if (this.userService.getRol() === 'administrador' && this.authservice.loggedIn()) {
      return true;
    }else{
    this.router.navigate(["/mainUser"])
    return false;
    }
  }
  
}
