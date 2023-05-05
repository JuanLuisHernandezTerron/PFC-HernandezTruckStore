import { Component } from '@angular/core';
import { PostService } from 'src/app/services/Post/post.service';
import { PostVehicle } from 'src/app/models/PostVehiculo';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from './../../../../services/Usuario/user.service';
@Component({
  selector: 'app-tractora-informacion',
  templateUrl: './tractora-informacion.component.html',
  styleUrls: ['./tractora-informacion.component.scss']
})
export class TractoraInformacionComponent {
  constructor(private servicePost: PostService,
    private _snackBar: MatSnackBar,
    private authservice: AuthService,
    private userService: UserService
  ) { }
  post: PostVehicle;
  arraydatos: Array<PostVehicle> = [];
  estaPost = false;


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

  agregarFavoritos(idPost) {
    let idUser = this.userService.getInfoToken();
    this.userService.getInfoUsuarioID(idUser).subscribe((data) => {
      if (JSON.stringify(data.consulta.favoritos).split('"').includes(idPost)) {
        this.authservice.eliminarFavoritosUser(idPost, idUser).subscribe((data) => {
          if (data.status === "Post EliminadoCorrectamente") {
            this._snackBar.open('Post Eliminado de Favoritos', 'Aceptar');
            this.servicePost.eliminarFavoritosUsuario(idPost, idUser).subscribe();
            window.location.reload();
          }
        })
      }

      if (!JSON.stringify(data.consulta.favoritos).split('"').includes(idPost)) {
        this.authservice.insertFavoritosUser(idPost, idUser).subscribe((data) => {
          if (data.status === "Post AñadidoCorrectamente") {
            this.servicePost.insertarFavoritosUsuario(idPost, idUser).subscribe();
            this._snackBar.open('Post añadido a Favoritos', 'Aceptar');
            window.location.reload();
          }
        })
      }
    })

  }

  idBoton(e) {
    return e;
  }
}