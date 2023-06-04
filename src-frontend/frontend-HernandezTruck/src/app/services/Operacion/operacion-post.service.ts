import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { operacion } from 'src/app/models/operacion';
@Injectable({
  providedIn: 'root'
})
export class OperacionPostService {
  private URL = 'http://localhost:3000';

  private OperationObservale = new BehaviorSubject<operacion>({
    _id: '',
    fecha_operacion: new Date(),
    operacionFinalizada: false,
    tipoVehiculo: '',
    informacionCompra: []
  });

  constructor(private http: HttpClient,
    private router: Router) { }

  get PostInformacion(): Observable<operacion> {
    return this.OperationObservale.asObservable();
  }

  crearOperacion(idUserComprador: String, idVendedor: String, idPost: String, tipoVehiculo: String) {
    return this.http.post<any>(this.URL + '/compras/agregarOperacion/' + idVendedor + '/' + idUserComprador + '/' + idPost+'/'+tipoVehiculo, '')
  }

  getAllOperaciones() {
    return this.http.get<any>(this.URL + '/compras/getInformacionAllOperations');
  }

  rechazarOperacion(idOperacion){
    return this.http.delete<any>(this.URL+'/compras/cancelarOperacion/'+idOperacion)
  }

  aceptarOperacion(tipoVehiculo,idOperacion,idVehiculo,idPost){
    return this.http.delete<any>(this.URL+'/compras/confirmarCompra/'+tipoVehiculo+'/'+idOperacion+'/'+idVehiculo+'/'+idPost)
  }

}
