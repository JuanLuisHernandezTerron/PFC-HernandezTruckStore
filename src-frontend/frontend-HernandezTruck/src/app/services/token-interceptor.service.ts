import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from 'rxjs';
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
