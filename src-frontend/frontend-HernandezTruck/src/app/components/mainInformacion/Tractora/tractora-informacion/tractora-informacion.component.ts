import { Component } from '@angular/core';
import { PostService } from 'src/app/services/Post/post.service';
import { PostVehicle } from 'src/app/models/PostVehiculo';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from './../../../../services/Usuario/user.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-tractora-informacion',
  templateUrl: './tractora-informacion.component.html',
  styleUrls: ['./tractora-informacion.component.scss'],
})
export class TractoraInformacionComponent {
  constructor(private servicePost: PostService,
    private _snackBar: MatSnackBar,
    public authservice: AuthService,
    private userService: UserService,
    private router: Router
  ) { }
  post: PostVehicle;
  arraydatos: Array<PostVehicle> = [];
  estaPost = false;


  ngOnInit() {
    this.cargarInfo();
  }

  cargarInfo() {
    this.arraydatos = [];
    this.servicePost.getPostsVehicle().subscribe((data) => {
      this.post = data;
      data.forEach(v => {
        if (v.informacionUser[0].idVehiculo.tipoVehiculo === "cabezatractora") {
          this.arraydatos.push(v)
        }
      });
    })
  }

  filtrar(marcaCamion: String, evento) {
    if (evento.checked) {
      setTimeout(() => {
        this.arraydatos.forEach(element => {
          if (element.informacionUser[0].idVehiculo.Marca.toLowerCase() === marcaCamion.toLowerCase()) {
            this.arraydatos = [];
            this.arraydatos.push(element);
          }
        })
      }, 100)
    } else {
      this.arraydatos = [];
      this.cargarInfo();
    }
  }

  filtroPrecio() {
    let preciosMin = (document.getElementById("precioMin") as HTMLInputElement).value;
    let preciosMax = (document.getElementById("precioMax") as HTMLInputElement).value;
    let arrayFiltrado = this.arraydatos.flatMap(e => e.informacionUser.filter(v => (v.idVehiculo.precio >= preciosMin && v.idVehiculo.precio <= preciosMax) || (v.idVehiculo.precio <= preciosMin) || (v.idVehiculo.precio < preciosMax)));
    console.log(arrayFiltrado);
    
    for (let i = 0; i < this.arraydatos.length; i++) {
      for (let index = 0; index < arrayFiltrado.length; index++) {
        this.arraydatos = this.arraydatos.filter(e=>e.informacionUser[0].idVehiculo._id);
      }
      if (arrayFiltrado.length == 0) {
        this.arraydatos = [];
      }
    }
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
    if (this.authservice.loggedIn()) {
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
    } else {
      this.router.navigateByUrl('/register');
    }


  }

  idBoton(e) {
    return e;
  }
}