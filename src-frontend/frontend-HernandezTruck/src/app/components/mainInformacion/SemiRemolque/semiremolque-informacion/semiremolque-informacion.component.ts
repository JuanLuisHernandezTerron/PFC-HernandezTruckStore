import { Component } from '@angular/core';
import { PostService } from 'src/app/services/Post/post.service';
import { PostVehicle } from 'src/app/models/PostVehiculo';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from './../../../../services/Usuario/user.service';
import { Router } from "@angular/router";
import { semiRemolque } from 'src/app/models/semiRemolque';
import { RemolqueService } from 'src/app/services/Vehiculos/Remolque/remolque.service';

@Component({
  selector: 'app-semiremolque-informacion',
  templateUrl: './semiremolque-informacion.component.html',
  styleUrls: ['./semiremolque-informacion.component.scss']
})
export class SemiremolqueInformacionComponent {
  constructor(private servicePost: PostService,
              private userService: UserService,
              private authService: AuthService,
              private _snackBar:MatSnackBar,
              private router: Router,
              private remolqueService: RemolqueService
    ) { }
    post: PostVehicle;
    arraydatos: Array<PostVehicle> = [];
    arrayRemolque: Array<semiRemolque> = [];

    ngOnInit() {
      this.cargarInfo();
    }

    cargarInfo() {
      this.arraydatos = [];
      this.arrayRemolque = [];
      (document.getElementById("precioMin") as HTMLInputElement).value = '';
      (document.getElementById("precioMax") as HTMLInputElement).value = '';
  
      this.servicePost.getPostsVehicle().subscribe((data) => {
        this.post = data;
        data.forEach(v => {
          if (v.informacionUser[0].idVehiculo.tipoVehiculo === "semirremolque") {
            this.arraydatos.push(v)
          }
        });
      })
  
      this.remolqueService.getAllInfoRemolque().subscribe((data) => {
        data.forEach(e => {
          this.arrayRemolque.push(e);
        });
      })      
    }

    filtrar(marcaCamion: String, evento) {
      let contador = 0;
      let inputs = document.querySelectorAll('mat-checkbox');
  
      if (evento.checked) {
        inputs.forEach(m => {
          m.classList.remove('mdc-checkbox--disabled')
          if (m.textContent != marcaCamion) {
            console.log(m.attributes);
            m.attributes[5].value = 'true';
            m.classList.add('mdc-checkbox--disabled')
          }
          console.log(m.attributes);
        })
  
        setTimeout(() => {
          this.arraydatos.forEach(element => {
            if (element.informacionUser[0].idVehiculo.Marca.toLowerCase() === marcaCamion.toLowerCase()) {
              contador++;
              this.arraydatos.push(element);
            }
          })
          this.arraydatos.splice(0, this.arraydatos.length - contador);
        }, 100)
      } else {
        this.arraydatos = [];
        this.cargarInfo();
  
        inputs.forEach(m => {
          m.attributes[5].value = 'false';
          m.classList.remove('mdc-checkbox--disabled')
        })
      }
    }

    filtroPrecio() {
      let preciosMin = Number((document.getElementById("precioMin") as HTMLInputElement).value);
      let preciosMax = Number((document.getElementById("precioMax") as HTMLInputElement).value);
  
      if (preciosMin > preciosMax) {
        this.arraydatos = this.arraydatos.filter(e => ((e.informacionUser[0].idVehiculo.precio > preciosMin)))
      } else if (preciosMin < preciosMax) {
        this.arraydatos = this.arraydatos.filter(e => ((e.informacionUser[0].idVehiculo.precio < preciosMax) || (e.informacionUser[0].idVehiculo.precio <= preciosMax && e.informacionUser[0].idVehiculo.precio >= preciosMin && e.informacionUser[0].id))
        );
      }
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
      if (this.authService.loggedIn()) {
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
      }else{
        this.router.navigateByUrl('/register');
      }

  
    }
  
    idBoton(e) {
      return e;
    }
}
