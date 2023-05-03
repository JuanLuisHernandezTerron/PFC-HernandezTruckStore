import { Component } from '@angular/core';
import { PostService } from 'src/app/services/Post/post.service';
import { PostVehicle } from 'src/app/models/PostVehiculo';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-tractora-informacion',
  templateUrl: './tractora-informacion.component.html',
  styleUrls: ['./tractora-informacion.component.scss']
})
export class TractoraInformacionComponent {
  constructor(private servicePost: PostService,
  ) { }
  post: PostVehicle;
  arraydatos: Array<PostVehicle> = [];

  ngOnInit() {
    this.servicePost.getPostsVehicle().subscribe((data) => {
      this.post = data;
      data.forEach(v => {
        if (v.informacionUser[0].idVehiculo.tipoVehiculo === "cabezatractora") {
          this.arraydatos.push(v)
        }
      });
    })
  }

  getPostAlquilerTractora() {
    this.arraydatos = [];
    this.servicePost.getPostAlquiler().subscribe((data) => {
      console.log(data)
      data.forEach(v => {
        if (v.informacionUser[0].idVehiculo.tipoVehiculo === "cabezatractora" && v.tipo_publicacion === "Alquilar") {
          this.arraydatos.push(v)
        }
      });
    })
  }

  getPostCompraTractora() {
    this.arraydatos = [];
    this.servicePost.getPostVenta().subscribe((data) => {
      data.forEach(v => {
        if (v.informacionUser[0].idVehiculo.tipoVehiculo === "cabezatractora" && v.tipo_publicacion === "Vender") {
          this.arraydatos.push(v)
        }
      });
    })
  }

  idBoton(e) {
    console.log(e)
    return e;
  }
}
