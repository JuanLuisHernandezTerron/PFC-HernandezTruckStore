import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { semiRemolque } from 'src/app/models/semiRemolque';
@Injectable({
  providedIn: 'root'
})
export class RemolqueService {
  private URL = 'http://localhost:3000';
  constructor(private http: HttpClient) { }


  getInfoVehiculoRemolque(idRemolque:String):Observable<semiRemolque>{
    return this.http.get<semiRemolque>(this.URL+'/semirremolques/informacionVehicleRemolque/'+idRemolque)
  }

  getCountRemolque():Observable<Number>{
    return this.http.get<Number>(this.URL+'/semirremolques/allRemolqueCount')
  }
}
