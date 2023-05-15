import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/Post/post.service';
import { PostVehicle } from 'src/app/models/PostVehiculo';
@Component({
  selector: 'app-report-post-admin',
  templateUrl: './report-post-admin.component.html',
  styleUrls: ['./report-post-admin.component.scss']
})
export class ReportPostAdminComponent implements OnInit {
  constructor (private postService:PostService) { }
  
  arraydatos: Array<PostVehicle> = [];
  ngOnInit(): void { 
    this.postService.getPostAlquiler().subscribe((data)=>{
      data.forEach(element => {        
        if (element.Reports.length > 0) {
          this.arraydatos.push(element)
        }
      });
    })

    this.postService.getPostVenta().subscribe((data)=>{
      data.forEach(element => {
        if (element.Reports.length > 0) {
          this.arraydatos.push(element)
        }
      });
    })
    console.log(this.arraydatos);
  }

  eliminarPost(idPost: string){
    let idVehiculo:String;
    let tipoVehiculo:String;
    this.arraydatos.forEach(element =>{      
      if (element._id === idPost) {
          idVehiculo = element.informacionUser[0].idVehiculo._id;
          tipoVehiculo = element.informacionUser[0].idVehiculo.tipoVehiculo;
      }
    })
    
    this.postService.eliminarPost(tipoVehiculo,idVehiculo,idPost).subscribe((data)=>{
      if (data === 'Post Eliminado Correctamente') {
          window.location.reload();
      }
    })
  }

  noOperacion(){
    return (this.arraydatos.length === 0) ?  true : false;
  }

}
