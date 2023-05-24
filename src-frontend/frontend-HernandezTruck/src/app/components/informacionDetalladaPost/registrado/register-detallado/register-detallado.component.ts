import { Component, OnInit } from '@angular/core';
import { AuthService } from '././../../../../services/auth.service';
import { PostService } from 'src/app/services/Post/post.service';
import { TractoraService } from 'src/app/services/Vehiculos/Tractora/tractora.service';
import { PostVehicle } from 'src/app/models/PostVehiculo';
import { tractora } from 'src/app/models/tractora';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/Usuario/user.service';
import { RemolqueService } from 'src/app/services/Vehiculos/Remolque/remolque.service';
import { semiRemolque } from 'src/app/models/semiRemolque';
import { OperacionPostService } from 'src/app/services/Operacion/operacion-post.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register-detallado',
  templateUrl: './register-detallado.component.html',
  styleUrls: ['./register-detallado.component.scss']
})
export class RegisterDetalladoComponent implements OnInit {
  informacionPost !: PostVehicle;
  es_tractora = false;
  DatoTractora !: tractora;
  DatoRemolque !: semiRemolque;
  constructor(public authservice: AuthService,
    private postServie: PostService,
    private tractoraService: TractoraService,
    private _snackBar: MatSnackBar,
    private userService: UserService,
    private remolqueService: RemolqueService,
    private operacionService: OperacionPostService,
    private router: Router) { }

  contador = 0;
  copyEnlace = window.location.toString();

  ngOnInit(): void {
    this.informacionPost = {
      _id: '',
      titulo: '',
      fecha_post: new Date(),
      tipo_publicacion: '',
      Reports: [],
      likes: [],
      media: '',
      informacionUser: []
    }

    this.DatoTractora = {
      _id: '',
      cv: 0,
      adblue: false,
      numeroDepositos: 0,
      kms: 0,
      combustible: '',
      retarder: false,
      vehiculo: []
    }

    this.DatoRemolque = {
      _id: '',
      tipoSemiremolque: '',
      tipoEje: '',
      ADR: false,
      vehiculo: []
    }



    let slug = window.location.pathname.split("/")
    this.postServie.getPost(slug[2]).subscribe((data) => {
      this.informacionPost = data;
    })
  }

  anadirOperacion() {
    let idUser = this.userService.getInfoToken();
    let idUserVendedor = this.informacionPost.informacionUser[0].idUsuarioVendedor._id;
    let idPost = this.informacionPost._id;
    let tipoVehiculo = this.informacionPost.informacionUser[0].idVehiculo.tipoVehiculo;
    console.log(tipoVehiculo)

    console.log(idPost)
    if (this.informacionPost.informacionUser[0].idUsuarioVendedor._id === idUser) {
      this._snackBar.open('Es tu propio Post!', 'Aceptar');
    } else {
      this.operacionService.crearOperacion(idUser, idUserVendedor, idPost,tipoVehiculo).subscribe((data) => {
        console.log(data)
        if (data === 'Operacion de Compra Exitosa') {
          this._snackBar.open('Has contactado con el Cliente!', 'Aceptar');
          setTimeout(() => {
            this.router.navigateByUrl('/')
          }, 2000)
        }
      });
    }
  }

  agregarFavoritos() {
    let idPost = this.informacionPost._id;
    let idUser = this.userService.getInfoToken();
    this.userService.getInfoUsuarioID(idUser).subscribe((data) => {
      if (JSON.stringify(data.consulta.favoritos).split('"').includes(idPost.toString())) {
        this.authservice.eliminarFavoritosUser(idPost, idUser).subscribe((data) => {
          if (data.status === "Post EliminadoCorrectamente") {
            this._snackBar.open('Post Eliminado de Favoritos', 'Aceptar');
            this.postServie.eliminarFavoritosUsuario(idPost, idUser).subscribe();
            window.location.reload();
          }
        })
      }

      if (!JSON.stringify(data.consulta.favoritos).split('"').includes(idPost.toString())) {
        this.authservice.insertFavoritosUser(idPost, idUser).subscribe((data) => {
          if (data.status === "Post AñadidoCorrectamente") {
            this.postServie.insertarFavoritosUsuario(idPost, idUser).subscribe();
            this._snackBar.open('Post añadido a Favoritos', 'Aceptar');
            window.location.reload();
          }
        })
      }
    })

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  reportarPost() {
    this.postServie.reportarPost(this.informacionPost._id, this.userService.getInfoToken()).subscribe((data) => {
      if (data.status === 'Post Reportador Correctamente') {
        this._snackBar.open('Post Reportado Correctamente, esta acción es irreversible', 'Aceptar');
      }
    })
  }

  tipoOperacion() {
    return (this.informacionPost.tipo_publicacion === 'Vender') ? true : false;
  }

  tipoPost() {

    let esCabeza = false;
    if (this.informacionPost.informacionUser[0]?.idVehiculo.tipoVehiculo === "cabezatractora") {
      esCabeza = true;
      if (this.contador <= 0) {
        this.contador++;
        this.tractoraService.getInfoVehiculo(this.informacionPost.informacionUser[0].idVehiculo._id).subscribe((data) => {
          this.DatoTractora = data
        })
      }
    } else if (this.informacionPost.informacionUser[0]?.idVehiculo.tipoVehiculo === "semirremolque") {
      if (this.contador <= 0) {
        this.contador++;
        this.remolqueService.getInfoVehiculoRemolque(this.informacionPost.informacionUser[0].idVehiculo._id).subscribe((data) => {
          this.DatoRemolque = data
        })
      }
    }
    return esCabeza;
  }
}
