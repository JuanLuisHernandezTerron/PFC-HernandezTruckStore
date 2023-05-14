import { Component,OnInit } from '@angular/core';
import { UserService } from 'src/app/services/Usuario/user.service';
import { PostService } from 'src/app/services/Post/post.service';
import { PostVehicle } from 'src/app/models/PostVehiculo';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mis-posts',
  templateUrl: './mis-posts.component.html',
  styleUrls: ['./mis-posts.component.scss']
})
export class MisPostsComponent implements OnInit{
  constructor (private userService: UserService,
              private postService: PostService,
              private _snackBar:MatSnackBar,
              private route:Router) {}

  arraydatos: Array<PostVehicle> = [];

  ngOnInit(): void {
      let idUser = this.userService.getInfoToken();
      this.postService.getPostsVehicle().subscribe((data)=>{
        data.forEach(element => {
          if (element.informacionUser[0].idUsuarioVendedor._id === idUser ) {
            this.arraydatos.push(element)
          }
        });
      })
      console.log(this.arraydatos);
      
  }

  editarPost(idPost:String, tipoVehiculo:String){
    (tipoVehiculo === 'cabezatractora') ? this.route.navigateByUrl('/editarPostTractora/'+idPost) : this.route.navigateByUrl('/editarPostRemolque/'+idPost);
  }


  noOperacion(){
    return (this.arraydatos.length === 0) ?  true : false;
  }

  eliminarPost(idPost){
    let tipoVehiculo = '';
    let idVehiculo = '';
    this.arraydatos.forEach(element => {
      if (element._id === idPost) {
        idVehiculo = element.informacionUser[0].idVehiculo._id;
        tipoVehiculo = element.informacionUser[0].idVehiculo.tipoVehiculo;
      }
    })
    this.postService.eliminarPost(tipoVehiculo,idVehiculo,idPost).subscribe((data)=>{
      if (data.status === 'Post Eliminado Correctamente') {
        this._snackBar.open('Post Eliminado de Favoritos', 'Aceptar');
      }
    })
    window.location.reload();
  }


}
