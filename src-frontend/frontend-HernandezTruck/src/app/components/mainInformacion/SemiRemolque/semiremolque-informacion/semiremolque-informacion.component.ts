import { Component } from '@angular/core';
import { PostService } from 'src/app/services/Post/post.service';
import { PostVehicle } from 'src/app/models/PostVehiculo';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from './../../../../services/Usuario/user.service';


@Component({
  selector: 'app-semiremolque-informacion',
  templateUrl: './semiremolque-informacion.component.html',
  styleUrls: ['./semiremolque-informacion.component.scss']
})
export class SemiremolqueInformacionComponent {
  constructor(private servicePost: PostService,
              private userService: UserService,
              private authService: AuthService,
              private _snackBar:MatSnackBar
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

    agregarFavoritos(idPost) {
      let idUser = this.userService.getInfoToken();
      this.userService.getInfoUsuarioID(idUser).subscribe((data) => {
        if (JSON.stringify(data.consulta.favoritos).split('"').includes(idPost)) {
          this.authService.eliminarFavoritosUser(idPost, idUser).subscribe((data) => {
            if (data.status === "Post EliminadoCorrectamente") {
              this._snackBar.open('Post Eliminado de Favoritos', 'Aceptar');
              this.servicePost.eliminarFavoritosUsuario(idPost, idUser).subscribe();
              window.location.reload();
            }
          })
        }
  
        if (!JSON.stringify(data.consulta.favoritos).split('"').includes(idPost)) {
          this.authService.insertFavoritosUser(idPost, idUser).subscribe((data) => {
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
      console.log(e)
      return e;
    }
}
