import { Component,OnInit } from '@angular/core';
import { TractoraService } from 'src/app/services/Vehiculos/Tractora/tractora.service';
import { RemolqueService } from 'src/app/services/Vehiculos/Remolque/remolque.service';
@Component({
  selector: 'app-main-user',
  templateUrl: './main-user.component.html',
  styleUrls: ['./main-user.component.scss']
})
export class MainUserComponent implements OnInit {
  constructor(private tractoraService: TractoraService,
              private remolqueservice: RemolqueService){

  }
  contadorTractora : Number;
  contadorRemolque : Number;

  ngOnInit(): void {
    this.tractoraService.getCountTractora().subscribe((data)=>{
      this.contadorTractora = data;
    })

    this.remolqueservice.getCountRemolque().subscribe((data)=>{
      this.contadorRemolque = data;
    })
  }

}
