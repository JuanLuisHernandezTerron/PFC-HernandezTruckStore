import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { JwtHelperService } from '@auth0/angular-jwt';
import { Usuario } from "./../../models/usuario";
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private URL = 'http://localhost:3000';
  constructor(private http: HttpClient,private router:Router) { }

  private userObservable = new BehaviorSubject<Usuario>({
    nombre:"",
    apellidos:"",
    email: "",
    rol:"",
    dni:"",
    telefono:null,
    direccion:""
  });

  get userInformacion():Observable<Usuario>{
    return this.userObservable.asObservable();
  }

  cambioPwdOlvidate(email:any){
    return this.http.post(this.URL+'/usuarios/olvidatePassword',email)
  }

  setUsuario(usuario:Usuario){
    this.userObservable.next(usuario);
  }

  getRol(){
    const help = new JwtHelperService;
    const token = localStorage.getItem('token');
    const payload = help.decodeToken(token);
    if (payload?.rol) {
      return payload.rol;
    }
  }

  getInfoToken(){
    const help = new JwtHelperService;
    const token = localStorage.getItem('token');
    const payload = help.decodeToken(token);
    if (payload?._id) {
      console.log(payload._id)
      return payload._id;
    }
  }

  updateUser(data:Object):Observable<any>{
    return this.http.put<any>(this.URL+'/usuarios/updateUser',data)
  }

  updatePassword(data:Object):Observable<any>{
    return this.http.put<any>(this.URL+'/usuarios/updatePasswd',data)
  }

   getInfoUsuario(rol:any):Observable<any[]>{
     return this.http.get<any>(this.URL+'/usuarios/getAllUsers?rol='+rol)
   }

   getInfoUsuarioID(id:any):Observable<any>{
     return this.http.get<Usuario[]>(this.URL+'/usuarios/getInfoUser/'+id)
   }
}