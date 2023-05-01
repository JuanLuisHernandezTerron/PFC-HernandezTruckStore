import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "./../services/auth.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class PostGuardGuard implements CanActivate {
  constructor(private authService: AuthService,private router: Router){

  }

  canActivate():boolean{
    if (this.authService.loggedIn()) {
      return true;
    }
    this.router.navigate(["/register"])
    return false;
  }
  
}
