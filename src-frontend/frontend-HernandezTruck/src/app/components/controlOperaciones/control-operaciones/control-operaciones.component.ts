import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/Post/post.service';
import { operacion } from 'src/app/models/operacion';
import { OperacionPostService } from 'src/app/services/Operacion/operacion-post.service';
import { UserService } from 'src/app/services/Usuario/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-control-operaciones',
  templateUrl: './control-operaciones.component.html',
  styleUrls: ['./control-operaciones.component.scss']
})
export class ControlOperacionesComponent implements OnInit {

  constructor(private postService: PostService,
    private operacionPostService: OperacionPostService,
    private userService: UserService,
    private router: Router) { }

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
      if (data === 'Operacion Eliminada Exitosamente'){
        this.router.navigateByUrl('/')
      }
     })
  }

  aceptarOperacion(idOperacion){
    let idPost = '';
    let tipoVehiculo = '';
    let idVehiculo = '';
    this.arraydatos.forEach(element => {
      if (element._id === idOperacion) {
        idPost = element.informacionCompra[0].idPost._id;
        tipoVehiculo = element.tipoVehiculo.toString();
        idVehiculo = element.informacionCompra[0].idPost.informacionUser[0].idVehiculo;
      }
    })

    this.operacionPostService.aceptarOperacion(tipoVehiculo,idOperacion,idVehiculo,idPost).subscribe((data)=>{
      if (data === 'Operacion Eliminada Exitosamente'){
        this.router.navigateByUrl('/')
      }
    })
  }

}
