import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from "@angular/router";
import { PostVehicle } from 'src/app/models/PostVehiculo';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private URL = 'http://localhost:3000';

  private postVehicleObservale = new BehaviorSubject<PostVehicle>({
    _id:"",
    titulo:"",
    fecha_post: new Date(),
    tipo_publicacion:"",
    Reports:[],
    likes:[],
    informacionUser:[],
    media:""
  });


  constructor(private http: HttpClient,private router:Router) { }

  get PostInformacion():Observable<PostVehicle>{
    return this.postVehicleObservale.asObservable();
  }

  getPost(id:String){
    return this.http.get<any>(this.URL+'/posts/getPost/'+id)
  }

  setPost(post:PostVehicle){
    this.postVehicleObservale.next(post);
  }

  getPostsVehicle():Observable<any>{
    return this.http.get<any>(this.URL+'/posts/getPostsAll')
  }

  getPostAlquiler():Observable<any>{
    return this.http.get<any>(this.URL+'/posts/getVehiclesAlquiler')
  }

  getPostVenta():Observable<any>{
    return this.http.get<any>(this.URL+'/posts/getVehiclesVenta')
  }
  
  registroPostSemiRemolque(postSemiremolque:any){
    return this.http.post<any>(this.URL+'/posts/newPost',postSemiremolque);
  }

  registroPostTractora(postTractora:FormData){
    return this.http.post<any>(this.URL+'/posts/newPost',postTractora);
  }
}
