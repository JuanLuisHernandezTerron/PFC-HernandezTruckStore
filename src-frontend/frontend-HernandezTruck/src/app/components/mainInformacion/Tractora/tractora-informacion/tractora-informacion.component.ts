import { Component } from '@angular/core';
import { PostService } from 'src/app/services/Post/post.service';
import { PostVehicle } from 'src/app/models/PostVehiculo';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from './../../../../services/Usuario/user.service';
import { Router } from "@angular/router";
import { TractoraService } from 'src/app/services/Vehiculos/Tractora/tractora.service';
import { tractora } from 'src/app/models/tractora';

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
    private router: Router,
    private tractoraService: TractoraService
  ) { }
  post: PostVehicle;
  arraydatos: Array<PostVehicle> = [];
  arrayTractora: Array<tractora> = [];
  estaPost = false;


  ngOnInit() {
    this.cargarInfo();
  }

  cargarInfo() {
    this.arraydatos = [];
    this.arrayTractora = [];

    this.servicePost.getPostsVehicle().subscribe((data) => {
      this.post = data;
      data.forEach(v => {
        if (v.informacionUser[0].idVehiculo.tipoVehiculo === "cabezatractora") {
          this.arraydatos.push(v)
        }
      });
    })

    this.tractoraService.getInfoAllTractora().subscribe((data) => {
      data.forEach(e => {
        this.arrayTractora.push(e);
      });
    })
  }

  filtrar(marcaCamion: String, evento) {
    let contador = 0;
    let inputs = document.querySelectorAll('mat-checkbox');
    
    inputs.forEach(m=>{
      if (m.textContent != marcaCamion) {
        console.log(m.attributes);
        
        m.attributes[5].value = 'true';
      }
      console.log(m.attributes);
    })
    
    
    if (evento.checked) {
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

  filtroCV() {
    let cvMin = Number((document.getElementById("cvMin") as HTMLInputElement).value);
    let cvMax = Number((document.getElementById("cvMax") as HTMLInputElement).value);
    let arrayAux = [];
    if (cvMin > cvMax) {
      this.arrayTractora = this.arrayTractora.filter(e => ((Number(e.cv) >= cvMin)))
    } else if (cvMin < cvMax) {
      this.arrayTractora = this.arrayTractora.filter(e => (((Number(e.cv) <= cvMax) || (Number(e.cv) <= cvMax && Number(e.cv) >= cvMin)))
      );
    }

    for (let i = 0; i < this.arrayTractora.length; i++) {
      for (let j = 0; j < this.arraydatos.length; j++) {
        if (this.arrayTractora[i]._id == this.arraydatos[j].informacionUser[0].idVehiculo._id) {
          arrayAux.push(this.arraydatos[j])
        }
      }
    }

    if (this.arrayTractora.length > 0) {
      this.arraydatos = arrayAux;
    }

    console.log(this.arrayTractora);
    console.log(this.arraydatos);
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