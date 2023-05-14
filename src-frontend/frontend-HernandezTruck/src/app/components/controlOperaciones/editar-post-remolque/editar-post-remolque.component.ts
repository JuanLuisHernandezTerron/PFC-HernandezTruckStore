import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/Post/post.service';
import { UserService } from 'src/app/services/Usuario/user.service';
import { Router } from "@angular/router";
import { PostVehicle } from 'src/app/models/PostVehiculo';
import { ChangeDetectorRef } from '@angular/core';
import { RemolqueService } from 'src/app/services/Vehiculos/Remolque/remolque.service';
@Component({
  selector: 'app-editar-post-remolque',
  templateUrl: './editar-post-remolque.component.html',
  styleUrls: ['./editar-post-remolque.component.scss']
})
export class EditarPostRemolqueComponent implements OnInit {
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private postservice: PostService,
    private route: Router,
    private cdref: ChangeDetectorRef,
    private remolqueService: RemolqueService
  ) { }

  formRemolque !: FormGroup;
  arraydatos: Array<PostVehicle> = [];

  ngOnInit(): void {
    let slug = window.location.pathname.split("/")
    this.postservice.getPost(slug[2]).subscribe((data) => {
      this.arraydatos.push(data);
      this.semiremolque.titulo = this.arraydatos[0].titulo.toString();
      this.semiremolque._id = this.arraydatos[0].informacionUser[0].idVehiculo._id;
      this.semiremolque.mma = this.arraydatos[0].informacionUser[0].idVehiculo.mma;
      this.semiremolque.fechaMatriculacion = this.arraydatos[0].informacionUser[0].idVehiculo.fechaMatriculacion;
      this.semiremolque.color = this.arraydatos[0].informacionUser[0].idVehiculo.color;
      this.semiremolque.Marca = this.arraydatos[0].informacionUser[0].idVehiculo.Marca;
      this.semiremolque.modelo = this.arraydatos[0].informacionUser[0].idVehiculo.modelo;
      this.semiremolque.precio = this.arraydatos[0].informacionUser[0].idVehiculo.precio;
      this.semiremolque.tipo_publicacion = this.arraydatos[0].tipo_publicacion.toString();
      this.semiremolque.ejes = this.arraydatos[0].informacionUser[0].idVehiculo.ejes;
      this.rellenarVehiculo();
      this.cdref.detectChanges();

    })
    this.validateSemiremolque()
  }

  semiremolque = {
    _id: "",
    ejes: "",
    mma: "",
    tipoVehiculo: 'semirremolque',
    fechaMatriculacion: '',
    Marca: '',
    modelo: '',
    precio: "",
    color: '',
    media: '',
    tipoSemiremolque: '',
    tipoEje: "",
    ADR: false,
    titulo: "",
    tipo_publicacion: "",
    idUsuarioVendedor: this.userService.getInfoToken(),
    idVehiculo: '',
    vehiculo: ''
  }

  rellenarVehiculo() {
    let idVehiculo = this.arraydatos[0].informacionUser[0].idVehiculo._id;
    this.remolqueService.getInfoVehiculoRemolque(idVehiculo).subscribe((data) => {
      this.semiremolque.tipoSemiremolque = data.tipoSemiremolque.toString();
      this.semiremolque.tipoEje = data.tipoEje.toString();
    })
  }

  validateSemiremolque(): void {
    this.formRemolque = this.fb.group({
      _id: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{1,4}(?!.*(LL|CH))[BCDFGHJKLMNPRSTVWXYZ]{3}$')]),
      tipoSemiremolque: new FormControl('', [Validators.required]),
      tipoEje: new FormControl('', [Validators.required]),
      ADR: new FormControl('', [Validators.required]),
      titulo: new FormControl('', [Validators.required]),
      tipo_publicacion: new FormControl('', [Validators.required]),
      idVehiculo: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required]),
      marca: new FormControl('', [Validators.required]),
      ejes: new FormControl('', [Validators.required]),
      mma: new FormControl('', [Validators.required]),
      fechaMatriculacion: new FormControl('', [Validators.required]),
      modelo: new FormControl('', [Validators.required]),
      color: new FormControl('', [Validators.required]),
    })
  }



  ingresarRemolque() {
    let slug = window.location.pathname.split("/");
    let idVehiculo = this.arraydatos[0].informacionUser[0].idVehiculo._id;
    this.postservice.actualizarPostRemolque(slug[2], idVehiculo, this.semiremolque).subscribe((data) => {
      if (data.status === 'Actualizado Correctamente') {
        this.route.navigateByUrl('/misPosts')
      }
    })
  }
}
