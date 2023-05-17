import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { PostService } from 'src/app/services/Post/post.service';
import { PostVehicle } from 'src/app/models/PostVehiculo';
import { Chart } from 'chart.js/auto';
import * as ChartJs from 'chart.js';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-estadisticas-admin',
  templateUrl: './estadisticas-admin.component.html',
  styleUrls: ['./estadisticas-admin.component.scss']
})

export class EstadisticasAdminComponent implements OnInit {
  constructor(private postService: PostService) { }
  arraydatos: Array<PostVehicle> = [];
  canvas: any;
  ctx: any;
  contadorVehiculoAlquiler: any = 0;
  contadorVehiculoVenta: any = 0;

  @ViewChild('mychart', { static: true }) mychart: any;
  ngOnInit(): void {
    let contadorAlquiler:Number;
    let contadorVenta:Number;
    this.postService.getPostAlquiler().subscribe((data) => {
      data.forEach(element => {
        this.arraydatos.push(element)
        this.contadorVehiculoAlquiler++;

      });

    })

    this.postService.getPostVenta().subscribe((data) => {
      data.forEach(element => {
        this.arraydatos.push(element)
        this.contadorVehiculoVenta++;
      });
    })

    this.postService.getCountAlquiler().subscribe((data)=>{
      contadorAlquiler = data
    })

    this.postService.getCountVenta().subscribe((data)=>{
      contadorVenta = data
    })

    this.canvas = this.mychart.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    setTimeout(()=>{
      new Chart (this.ctx, {
        type: 'doughnut',
        data: {
          labels: [
            'Vehiculos Compra',
            'Vehiculos Alquiler',
          ],
          datasets: [{
            label: 'Inscrito en la BD',
            data: [contadorVenta, contadorAlquiler],
            backgroundColor: [
              'rgb(171, 235, 198)',
              'rgb(46, 134, 193)'
            ],
            hoverOffset: 2,
          }]
        },
        options: {
          plugins: {
            subtitle: {
              display: true,
              text: 'Vehiculos Registrados en Hernandez Truck Store '
            }
          }
        }
      })
    },300)
  }
}
