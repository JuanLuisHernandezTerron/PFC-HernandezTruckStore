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
    const formData = new FormData();
    formData.append('_id',this.cabezaTractora._id);
    formData.append('ejes',this.cabezaTractora.ejes);
    formData.append('mma',this.cabezaTractora.mma);
    formData.append('tipoVehiculo',this.cabezaTractora.tipoVehiculo);
    formData.append('fechaMatriculacion',this.cabezaTractora.fechaMatriculacion);
    formData.append('Marca',this.cabezaTractora.Marca);
    formData.append('modelo',this.cabezaTractora.modelo);
    formData.append('precio',this.cabezaTractora.precio);
    formData.append('color',this.cabezaTractora.color);
    formData.append('cv',this.cabezaTractora.cv);
    // let linkMedia = this.cabezaTractora.media.split('\\');
    // console.log(linkMedia[2]);
    // console.log(typeof(linkMedia[2]));
    // formData.append('media',linkMedia[2]);
    console.log(this.cabezaTractora.media);
    formData.append('media',this.cabezaTractora.media);
    formData.append('adblue',JSON.stringify(this.cabezaTractora.adblue));
    formData.append('numeroDepositos',this.cabezaTractora.numeroDepositos);
    formData.append('kms',this.cabezaTractora.kms);
    formData.append('combustible',this.cabezaTractora.combustible);
    formData.append('retarde',JSON.stringify(this.cabezaTractora.retarde));
    formData.append('titulo',this.cabezaTractora.titulo);
    formData.append('tipo_publicacion',this.cabezaTractora.tipo_publicacion);
    formData.append('idUsuarioVendedor',this.cabezaTractora.idUsuarioVendedor);
    formData.append('idVehiculo',this.cabezaTractora.idVehiculo);
    formData.append('vehiculo',this.cabezaTractora.vehiculo);


    this.postservice.registroPostTractora(formData).subscribe(
          res =>{
            if (res.status === 'Ingresado Correctamente') {
              this.route.navigate(['/mainUser']); 
            }
        },
          err=>
            console.log(err)
    )
  }
}
