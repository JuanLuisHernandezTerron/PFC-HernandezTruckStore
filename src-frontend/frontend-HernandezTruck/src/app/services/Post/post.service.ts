import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
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

  getAllPost(){
    return this.http.get<any>(this.URL+'/posts/getAllPost/',{});
  }

  getCountAlquiler(){
    return this.http.get<Number>(this.URL+'/posts/getCountAlquiler/',{});
  }

  getCountVenta(){
    return this.http.get<Number>(this.URL+'/posts/getCountVenta/',{});
  }

  actualizarPostTractora(idPost:String,idVehiculo:String,tractora:Object){
    return this.http.put<any>(this.URL+'/posts/updatePost/'+idPost+'/'+idVehiculo,tractora);
  }

  actualizarPostRemolque(idPost:String,idVehiculo:String,remolque:Object){
    return this.http.put<any>(this.URL+'/posts/updatePost/'+idPost+'/'+idVehiculo,remolque);
  }

  eliminarPost(tipoVehiculo:String,idVehiculo:String,idPost:String){
    return this.http.delete<any>(this.URL+'/posts/eliminarPost/'+tipoVehiculo+'/'+idVehiculo+'/'+idPost+'')
  }

  reportarPost(idPost:String,idUser:String){
    return this.http.put<any>(this.URL+'/posts/anadirPostReportado/'+idPost+"/"+idUser,"")
  }

  insertarFavoritosUsuario(idPost:String,idUser:String){
    return this.http.put<any>(this.URL+'/posts/insertUsuarioFavoritos/'+idPost+"/"+idUser,"")
  }

  eliminarFavoritosUsuario(idPost:String,idUser:String){
    return this.http.put<any>(this.URL+'/posts/eliminarUsuarioFavoritos/'+idPost+"/"+idUser,"")
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
  
  registroPostSemiRemolque(postSemiremolque:FormData){
    return this.http.post<any>(this.URL+'/posts/newPost',postSemiremolque);
  }

  registroPostTractora(postTractora:FormData){
    return this.http.post<any>(this.URL+'/posts/newPost',postTractora);
  }
}
