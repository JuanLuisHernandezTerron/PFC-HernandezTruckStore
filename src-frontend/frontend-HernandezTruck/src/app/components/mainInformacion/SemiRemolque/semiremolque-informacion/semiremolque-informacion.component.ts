import { Component } from '@angular/core';
import { PostService } from 'src/app/services/Post/post.service';
import { PostVehicle } from 'src/app/models/PostVehiculo';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-semiremolque-informacion',
  templateUrl: './semiremolque-informacion.component.html',
  styleUrls: ['./semiremolque-informacion.component.scss']
})
export class SemiremolqueInformacionComponent {
  constructor(private servicePost: PostService,
    ) { }
    post: PostVehicle;
    arraydatos: Array<PostVehicle> = [];
  
    ngOnInit() {
      this.servicePost.getPostsVehicle().subscribe((data) => {
        this.post = data;
        data.forEach(v => {
          if (v.informacionUser[0].idVehiculo.tipoVehiculo === "semirremolque") {
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
          if (v.informacionUser[0].idVehiculo.tipoVehiculo === "semirremolque" && v.tipo_publicacion === "Alquilar") {
            this.arraydatos.push(v)
          }
        });
      })
    }
  
    getPostCompraTractora() {
      this.arraydatos = [];
      this.servicePost.getPostVenta().subscribe((data) => {
        data.forEach(v => {
          if (v.informacionUser[0].idVehiculo.tipoVehiculo === "semirremolque" && v.tipo_publicacion === "Vender") {
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
