import { Component,OnInit } from '@angular/core';
import { UserService } from 'src/app/services/Usuario/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/usuario';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostService } from 'src/app/services/Post/post.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.scss']
})
export class FavoritosComponent implements OnInit{
  constructor (private userService : UserService,
              private authService : AuthService,
              private _snackBar : MatSnackBar,
              private servicePost: PostService,
              private router: Router) { }
  
  arraydatos: Array<Usuario> = [];

  ngOnInit(): void {
    let id = this.userService.getInfoToken();
    this.userService.getInfoUsuarioID(id).subscribe((data)=>{
      data.consulta.favoritos.forEach(element => {
        this.arraydatos.push(element)
      });
    })   
    console.log(this.arraydatos) 
  }

  noOperacion(){
    return (this.arraydatos.length === 0) ?  true : false;
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

}
