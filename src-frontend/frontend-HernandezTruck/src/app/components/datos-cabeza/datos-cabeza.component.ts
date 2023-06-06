import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { PostService } from 'src/app/services/Post/post.service';
import { UserService } from 'src/app/services/Usuario/user.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-datos-cabeza',
  templateUrl: './datos-cabeza.component.html',
  styleUrls: ['./datos-cabeza.component.scss']
})
export class DatosCabezaComponent implements OnInit{
  formGroup !: FormGroup;  
  constructor(private userService:UserService,
              private fb: FormBuilder,
              private postservice:PostService,
              private route : Router){
    this.validatorPostVehicle();
  }
  imagenesArray:string;
  formData = new FormData();

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

  ngOnInit(): void {
    
  }

  ingresarTractora():void{
    this.formData = new FormData()
    this.formData.append('_id',this.cabezaTractora._id);
    this.formData.append('ejes',this.cabezaTractora.ejes);
    this.formData.append('mma',this.cabezaTractora.mma);
    this.formData.append('tipoVehiculo',this.cabezaTractora.tipoVehiculo);
    this.formData.append('fechaMatriculacion',this.cabezaTractora.fechaMatriculacion);
    this.formData.append('Marca',this.cabezaTractora.Marca);
    this.formData.append('modelo',this.cabezaTractora.modelo);
    this.formData.append('precio',this.cabezaTractora.precio);
    this.formData.append('color',this.cabezaTractora.color);
    this.formData.append('cv',this.cabezaTractora.cv);
    this.formData.append('media',this.imagenesArray);
    this.formData.append('adblue',JSON.stringify(this.cabezaTractora.adblue));
    this.formData.append('numeroDepositos',this.cabezaTractora.numeroDepositos);
    this.formData.append('kms',this.cabezaTractora.kms);
    this.formData.append('combustible',this.cabezaTractora.combustible);
    this.formData.append('retarde',JSON.stringify(this.cabezaTractora.retarde));
    this.formData.append('titulo',this.cabezaTractora.titulo);
    this.formData.append('tipo_publicacion',this.cabezaTractora.tipo_publicacion);
    this.formData.append('idUsuarioVendedor',this.cabezaTractora.idUsuarioVendedor);
    this.formData.append('idVehiculo',this.cabezaTractora.idVehiculo);
    this.formData.append('vehiculo',this.cabezaTractora.vehiculo);
    
    this.postservice.registroPostTractora(this.formData).subscribe(
      res =>{
        if (res.status === 'Ingresado Correctamente') {
          this.route.navigate(['/mainUser']); 
        }
      },
      err=>{
            console.log(this.formData);
            if (err.error.error === 'Vehiculo no Introducido,La matrícula ya está ingresada en nuestra Base de Datos') {
              let warning = document.getElementById('dangerWarning');
              warning.classList.add('credentails');
              this.formData = new FormData()
            }
          }
    )
  }

  imagenesChange(event){
    for (let index = 0; index < event.target.files.length; index++) {
      this.imagenesArray = event.target.files[index];
    }
  }

}
