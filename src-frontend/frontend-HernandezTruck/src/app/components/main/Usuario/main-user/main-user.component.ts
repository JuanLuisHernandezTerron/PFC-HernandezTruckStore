import { Component, OnInit } from '@angular/core';
import { TractoraService } from 'src/app/services/Vehiculos/Tractora/tractora.service';
import { RemolqueService } from 'src/app/services/Vehiculos/Remolque/remolque.service';
import { PostService } from 'src/app/services/Post/post.service';
import { PostVehicle } from 'src/app/models/PostVehiculo';

@Component({
  selector: 'app-main-user',
  templateUrl: './main-user.component.html',
  styleUrls: ['./main-user.component.scss']
})
export class MainUserComponent implements OnInit {
  constructor(private tractoraService: TractoraService,
    private remolqueservice: RemolqueService,
    private postService: PostService) {

  }
  contadorTractora: Number;
  contadorRemolque: Number;
  arraydatos: Array<PostVehicle> = [];
  arraydatosLikes: Array<PostVehicle> = [];
  
  ngOnInit(): void {

    this.tractoraService.getCountTractora().subscribe((data) => {
      this.contadorTractora = data;
    })

    this.remolqueservice.getCountRemolque().subscribe((data) => {
      this.contadorRemolque = data;
    })

    this.postService.getAllPost().subscribe((data) => {
      data.forEach(element => {
        this.arraydatos.push(element)
        this.arraydatosLikes.push(element)
      });
    })
    
    setTimeout(()=>{
      this.arraydatosLikes.sort((a,b) =>{return b.likes.length - a.likes.length});
      this.arraydatosLikes.splice(3,this.arraydatosLikes.length);
      this.arraydatos.splice(3,this.arraydatos.length);
    },300)

  }

}
