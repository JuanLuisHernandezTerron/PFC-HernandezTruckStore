import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/Post/post.service';
import { operacion } from 'src/app/models/operacion';
import { OperacionPostService } from 'src/app/services/Operacion/operacion-post.service';
import { UserService } from 'src/app/services/Usuario/user.service';
@Component({
  selector: 'app-control-operaciones',
  templateUrl: './control-operaciones.component.html',
  styleUrls: ['./control-operaciones.component.scss']
})
export class ControlOperacionesComponent implements OnInit {

  constructor(private postService: PostService,
    private operacionPostService: OperacionPostService,
    private userService: UserService) { }

  arraydatos: Array<operacion> = [];

  ngOnInit(): void {
    this.operacionPostService.getAllOperaciones().subscribe((data) => {
       data.forEach(element => {
         if (element.informacionCompra[0].idUsuarioVendedor._id === this.userService.getInfoToken()) {
           this.arraydatos.push(element)
         }
       });
    })
    console.log(this.arraydatos)
  }

  cancelarOperacion(idOperacion){
     this.operacionPostService.rechazarOperacion(idOperacion).subscribe((data)=>{
      console.log(data);
     })
  }

  aceptarOperacion(idOperacion){
    let idPost = '';
    this.arraydatos.forEach(element => {
      if (element._id === idOperacion) {
        idPost = element.informacionCompra[0].idPost._id;
      }
    })
    let post = this.postService.getPost(idPost).subscribe((data)=>{
      console.log(data);
    });
    console.log(post)


    // this.operacionPostService.aceptarOperacion().subscribe((data)=>{
    //   console.log(data);
    // })
  }

}
