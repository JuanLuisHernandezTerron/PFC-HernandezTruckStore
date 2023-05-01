import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private URL = 'http://localhost:3000';

  constructor(private http: HttpClient,private router:Router) { }

  registroPostTractora(postTractora:any){
    return this.http.post<any>(this.URL+'/posts/newPost',postTractora);
  }
}
