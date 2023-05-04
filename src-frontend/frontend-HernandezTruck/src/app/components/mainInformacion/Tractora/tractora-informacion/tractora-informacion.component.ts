import { Component } from '@angular/core';
import { PostService } from 'src/app/services/Post/post.service';
import { PostVehicle } from 'src/app/models/PostVehiculo';
import { Observable } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import {UserService} from './../../../../services/Usuario/user.service'

@Component({
  selector: 'app-tractora-informacion',
  templateUrl: './tractora-informacion.component.html',
  styleUrls: ['./tractora-informacion.component.scss']
})
export class TractoraInformacionComponent {
  constructor(private servicePost: PostService,
              private _snackBar: MatSnackBar,
              private authservice: AuthService,
              private userService : UserService
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

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
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

  agregarFavoritos(){
    let idUser = this.userService.getInfoToken();
    // this.authservice.insertFavoritosUser(,idUser).subscribe((data)=>{
    //   console.log(data);
    // })
  }

  idBoton(e) {
    console.log(e)
    return e;
  }
}
