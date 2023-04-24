import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private URL = 'http://localhost:3000';
  constructor(private http: HttpClient,private router:Router) { }

  getRol(){
    const help = new JwtHelperService;
    const token = localStorage.getItem('token');
    const payload = help.decodeToken(token);
    console.log(payload)
    if (payload?.rol) {
      return payload.rol;
    }
  }

   getInfoUsuario(rol:any):Observable<any[]>{
     return this.http.get<any>(this.URL+'/usuarios/getAllUsers?rol='+rol)
   }
}