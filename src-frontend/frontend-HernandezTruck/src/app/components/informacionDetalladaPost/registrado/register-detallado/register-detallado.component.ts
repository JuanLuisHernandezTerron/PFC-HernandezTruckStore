import { Component, OnInit } from '@angular/core';
import {AuthService} from '././../../../../services/auth.service';
import { PostService } from 'src/app/services/Post/post.service';

@Component({
  selector: 'app-register-detallado',
  templateUrl: './register-detallado.component.html',
  styleUrls: ['./register-detallado.component.scss']
})
export class RegisterDetalladoComponent implements OnInit {
  arraydatos !: any;
  es_tractora = false;

  constructor (public authservice: AuthService,
              private postServie : PostService) { }
  contador = 0;
  ngOnInit(): void {
    let slug = window.location.pathname.split("/")
    this.postServie.getPost(slug[2]).subscribe((data) => {
      console.log(data)
      this.arraydatos = data;
    })
  }

  tipoPost(){
   let  esCabeza = false;
   console.log(this.arraydatos)
  if (this.arraydatos.informacionUser[0].idVehiculo.tipoVehiculo === "cabezatractora") {
       esCabeza =  true;
     }
    return esCabeza;
  }
}
