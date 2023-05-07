import { Component, OnInit } from '@angular/core';
import {AuthService} from '././../../../../services/auth.service';
import { PostService } from 'src/app/services/Post/post.service';
import { TractoraService } from 'src/app/services/Vehiculos/Tractora/tractora.service';

@Component({
  selector: 'app-register-detallado',
  templateUrl: './register-detallado.component.html',
  styleUrls: ['./register-detallado.component.scss']
})
export class RegisterDetalladoComponent implements OnInit {
  arraydatos !: any;
  es_tractora = false;
  arrayDatoTractora !: any; 

  constructor (public authservice: AuthService,
              private postServie : PostService,
              private tractoraService: TractoraService) { }
  contador = 0;
  ngOnInit(): void {
    let slug = window.location.pathname.split("/")
    this.postServie.getPost(slug[2]).subscribe((data) => {
      this.arraydatos = data;
    })

    // this.tractoraService.getInfoVehiculo(this.arraydatos.informacionUser[0].idVehiculo._id).subscribe((data)=>{
    //   return data;
    //   })
  }

  tipoPost(){
   let esCabeza = false;
  if (this.arraydatos.informacionUser[0].idVehiculo.tipoVehiculo === "cabezatractora") {
       esCabeza =  true;
       console.log(this.arraydatos)
  }else{

  }
    return esCabeza;
  }
}
