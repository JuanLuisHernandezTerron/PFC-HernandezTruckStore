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
      });
    })

    let array = this.arraydatos.sort((a,b) => a.likes.length - b.likes.length)

    console.log(array);
    
  }

}
