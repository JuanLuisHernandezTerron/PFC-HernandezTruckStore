import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  registro(user:any){
    return this.http.post<any>(this.URL+'/usuarios/register',user);
  }
}
