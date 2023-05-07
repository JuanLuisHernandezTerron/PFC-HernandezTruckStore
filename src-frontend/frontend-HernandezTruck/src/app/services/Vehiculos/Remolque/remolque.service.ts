import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RemolqueService {
  private URL = 'http://localhost:3000';
  constructor(private http: HttpClient) { }


  getCountRemolque():Observable<Number>{
    return this.http.get<Number>(this.URL+'/semirremolques/allRemolqueCount')
  }
}
