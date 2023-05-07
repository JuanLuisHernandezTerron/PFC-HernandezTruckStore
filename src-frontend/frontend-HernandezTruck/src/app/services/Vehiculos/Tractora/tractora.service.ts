import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { tractora } from 'src/app/models/tractora';

@Injectable({
  providedIn: 'root'
})
export class TractoraService {
  private URL = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getInfoVehiculo(idTractora:String):Observable<tractora>{
    return this.http.get<tractora>(this.URL+'/tractoras/informacionVehicleTractora/'+idTractora)
  }

  getCountTractora():Observable<Number>{
    return this.http.get<Number>(this.URL+'/tractoras/allTractoras')
  }
}
