import { Component, OnInit } from '@angular/core';
import {AuthService} from '././../../../../services/auth.service';
import { PostService } from 'src/app/services/Post/post.service';
import { TractoraService } from 'src/app/services/Vehiculos/Tractora/tractora.service';
import { PostVehicle } from 'src/app/models/PostVehiculo';
import { tractora } from 'src/app/models/tractora';
@Component({
  selector: 'app-register-detallado',
  templateUrl: './register-detallado.component.html',
  styleUrls: ['./register-detallado.component.scss']
})
export class RegisterDetalladoComponent implements OnInit {
  informacionPost !: PostVehicle;
  es_tractora = false;
  DatoTractora !: tractora; 
  constructor (public authservice: AuthService,
              private postServie : PostService,
              private tractoraService: TractoraService) { }
  contador = 0;

  ngOnInit(): void {
    this.informacionPost = {
      _id:'',
      titulo:'',
      fecha_post: new Date(),
      tipo_publicacion:'',
      Reports: [],
      likes:[],
      media:'',
      informacionUser:[]
    }

    this.DatoTractora={
      _id:'',
      cv:0,
      adblue: false,
      numeroDepositos: 0,
      kms:0,
      combustible:'',
      retarder:false,
      vehiculo:[]
    }


    let slug = window.location.pathname.split("/")
    this.postServie.getPost(slug[2]).subscribe((data) => {
      this.informacionPost = data;
    })

  }

  tipoPost(){
   let esCabeza = false;

    if (this.informacionPost.informacionUser[0].idVehiculo.tipoVehiculo === "cabezatractora") {
      esCabeza =  true;
      if (this.contador <= 0) {
         this.contador ++;
         this.tractoraService.getInfoVehiculo(this.informacionPost.informacionUser[0].idVehiculo._id).subscribe((data)=>{
         this.DatoTractora = data
      })
      }
      console.log(this.informacionPost)
      console.log(this.DatoTractora)
   }
    return esCabeza;
  }
}
