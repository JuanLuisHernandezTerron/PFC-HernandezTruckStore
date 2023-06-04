import { Injectable } from '@angular/core';
import {HttpInterceptor } from "@angular/common/http";
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private authservice: AuthService) { }

  intercept(req:any, next:any) {
    const tokenreq = req.clone({
      setHeaders:{
        authorization: 'Bearer ' + this.authservice.returnToken()
      }
    })
    return next.handle(tokenreq);
  }

}
