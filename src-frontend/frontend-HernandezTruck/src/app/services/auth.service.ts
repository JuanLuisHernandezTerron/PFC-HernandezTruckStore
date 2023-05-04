import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:3000';

  constructor(private http: HttpClient,private router:Router) { }

  registro(user:any){
    return this.http.post<any>(this.URL+'/usuarios/register',user);
  }

  login(user:any){
    return this.http.post<any>(this.URL+'/usuarios/login',user);
  }

  insertFavoritosUser(idUser,idPost){
    return this.http.put<any>(this.URL+'/usuarios/insertPostFavorito/'+idPost+"/"+idUser,{});
  }

  loggedIn(){
    if (localStorage.getItem('token')) {
      return true;
    }else{
      return false;
    }
  }

  returnToken(){
    return localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(["/login"])
  }
}
