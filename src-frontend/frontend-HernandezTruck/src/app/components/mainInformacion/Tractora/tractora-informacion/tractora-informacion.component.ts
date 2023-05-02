import { Component } from '@angular/core';
import { PostService } from 'src/app/services/Post/post.service';
import { PostVehicle } from 'src/app/models/PostVehiculo';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-tractora-informacion',
  templateUrl: './tractora-informacion.component.html',
  styleUrls: ['./tractora-informacion.component.scss']
})
export class TractoraInformacionComponent {
  constructor(private servicePost: PostService,
              ){ }
  post: PostVehicle;

  ngOnInit(){
    this.servicePost.getPostsVehicle().subscribe((data)=>{
      this.post = data;
      console.log(this.post)
    })
  }

  getPostAlquilerTractora(){
    this.servicePost.getPostAlquiler().subscribe((data)=>{
      let contador = 0;
      data.forEach(v => {
        if (v.informacionUser[0].idVehiculo.tipoVehiculo === "cabezatractora"){
          contador ++;
          this.post = data
        }else{
          data.splice(contador,contador+1)
        };
      });
    })
  }

  getPostCompraTractora(){
    this.servicePost.getPostVenta().subscribe((data)=>{
      let contador = 0;
      data.forEach(v => {
        if (v.informacionUser[0].idVehiculo.tipoVehiculo === "cabezatractora"){
          contador ++;
          this.post = data
        }else{
          data.splice(contador,contador+1)
        };
      });
    })
  }

  idBoton(e){
    console.log(e)
    return e; 
  }
}
