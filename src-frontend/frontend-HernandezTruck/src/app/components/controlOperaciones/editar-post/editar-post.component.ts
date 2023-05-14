import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { PostService } from 'src/app/services/Post/post.service';
import { UserService } from 'src/app/services/Usuario/user.service';
import { Router } from "@angular/router";
import { PostVehicle } from 'src/app/models/PostVehiculo';
import { TractoraService } from 'src/app/services/Vehiculos/Tractora/tractora.service';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-editar-post',
  templateUrl: './editar-post.component.html',
  styleUrls: ['./editar-post.component.scss']
})
export class EditarPostComponent implements OnInit{
  formGroup !: FormGroup;
  arraydatos: Array<PostVehicle> = [];

  constructor(private userService:UserService,
              private fb: FormBuilder,
              private postservice:PostService,
              private route : Router,
              private tractoraService:TractoraService,
              private cdref : ChangeDetectorRef){
    this.validatorPostVehicle();
  }

  ngOnInit(): void {
    let slug = window.location.pathname.split("/")
    this.postservice.getPost(slug[2]).subscribe((data)=>{
      this.arraydatos.push(data);
      this.cabezaTractora.titulo = this.arraydatos[0].titulo.toString();
      this.cabezaTractora._id = this.arraydatos[0].informacionUser[0].idVehiculo._id;
      this.cabezaTractora.mma = this.arraydatos[0].informacionUser[0].idVehiculo.mma;
      this.cabezaTractora.fechaMatriculacion = this.arraydatos[0].informacionUser[0].idVehiculo.fechaMatriculacion;
      this.cabezaTractora.color = this.arraydatos[0].informacionUser[0].idVehiculo.color;
      this.cabezaTractora.Marca = this.arraydatos[0].informacionUser[0].idVehiculo.Marca;
      this.cabezaTractora.modelo = this.arraydatos[0].informacionUser[0].idVehiculo.modelo;
      this.cabezaTractora.precio = this.arraydatos[0].informacionUser[0].idVehiculo.precio;
      this.cabezaTractora.tipo_publicacion = this.arraydatos[0].tipo_publicacion.toString();
      this.cabezaTractora.ejes = this.arraydatos[0].informacionUser[0].idVehiculo.ejes;
      this.rellenarVehiculo();
      this.cdref.detectChanges();
    })
  }
  

  cabezaTractora={
    _id:'',
    ejes:'',
    mma:'',
    tipoVehiculo:'cabezatractora',
    fechaMatriculacion:'',
    Marca:'',
    modelo:'',
    precio:'',
    color:'',
    cv:'',
    media:'',
    adblue:false,
    numeroDepositos:'',
    kms:'',
    combustible:'',
    retarde:false,
    titulo:'',
    tipo_publicacion:'',
    idUsuarioVendedor:this.userService.getInfoToken(),
    idVehiculo:'',
    vehiculo:''
  }

  rellenarVehiculo(){
    let idVehiculo = this.arraydatos[0].informacionUser[0].idVehiculo._id;
    this.tractoraService.getInfoVehiculo(idVehiculo).subscribe((data)=>{
      this.cabezaTractora.cv = data.cv.toString();
      this.cabezaTractora.numeroDepositos = data.numeroDepositos.toString();
      this.cabezaTractora.kms = data.kms.toString();
      this.cabezaTractora.combustible = data.combustible.toString();
    })
  }

  validatorPostVehicle():void{
    this.formGroup = this.fb.group({
      marca : new FormControl('', [Validators.required]),
      modelo : new FormControl('', [Validators.required]),
      _id : new FormControl('', [Validators.required,Validators.pattern('^[0-9]{1,4}(?!.*(LL|CH))[BCDFGHJKLMNPRSTVWXYZ]{3}$')]),
      mma : new FormControl('', [Validators.required]),
      fechaMatriculacion : new FormControl('', [Validators.required]),
      color : new FormControl('', [Validators.required]),
      cv : new FormControl('', [Validators.required]),
      ejes : new FormControl('', [Validators.required]),
      numeroDepositos : new FormControl('', [Validators.required]),
      kms : new FormControl('', [Validators.required]),
      combustible : new FormControl('', [Validators.required]),
      retarde : new FormControl('', [Validators.required]),
      precio : new FormControl('', [Validators.required]),
      titulo : new FormControl('', [Validators.required]),
      tipo_publicacion : new FormControl('', [Validators.required]),
      adblue : new FormControl('', [Validators.required]),
      media : new FormControl('', [Validators.required])
    });
  }

  ingresarTractora():void{
    let slug = window.location.pathname.split("/");
    let idVehiculo = this.arraydatos[0].informacionUser[0].idVehiculo._id;
    this.postservice.actualizarPostTractora(slug[2],idVehiculo,this.cabezaTractora).subscribe((data)=>{
      if (data.status === 'Actualizado Correctamente') {
        this.route.navigateByUrl('/misPosts')
      }
    });
  }
}


