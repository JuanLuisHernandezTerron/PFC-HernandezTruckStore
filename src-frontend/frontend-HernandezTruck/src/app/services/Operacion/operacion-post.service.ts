import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { operacion } from 'src/app/models/operacion';
@Injectable({
  providedIn: 'root'
})
export class OperacionPostService {
  private URL = 'http://localhost:3000';

  private OperationObservale = new BehaviorSubject<operacion>({
    fecha_operacion : new Date(),
    operacionFinalizada: false,
    informacionCompra :[]
  });

  constructor(private http: HttpClient,
            private router:Router) { }

get PostInformacion():Observable<operacion>{
  return this.OperationObservale.asObservable();
}

crearOperacion(idUserComprador:String, idVendedor:String, idPost:String){
  return this.http.post<any>(this.URL+'/compras/agregarOperacion/'+idVendedor+'/'+idUserComprador+'/'+idPost,'')
}
          
}
