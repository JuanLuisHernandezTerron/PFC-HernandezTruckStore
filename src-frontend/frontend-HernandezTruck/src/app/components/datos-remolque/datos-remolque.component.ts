import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { PostService } from 'src/app/services/Post/post.service';
import { UserService } from 'src/app/services/Usuario/user.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-datos-remolque',
  templateUrl: './datos-remolque.component.html',
  styleUrls: ['./datos-remolque.component.scss']
})
export class DatosRemolqueComponent implements OnInit{

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private postservice:PostService,
    private route : Router,
){ }

  imagenesArray:string;
  formRemolque !: FormGroup;
  formData = new FormData();

  ngOnInit(): void {
    this.validateSemiremolque()
  }
  semiremolque={
    _id:"",
    ejes:"",
    mma:"",
    tipoVehiculo:'semirremolque',
    fechaMatriculacion:'',
    Marca:'',
    modelo:'',
    precio:"",
    color:'',
    media:'',
    tipoSemiremolque:'',
    tipoEje:"",
    ADR:false,
    titulo:"",
    tipo_publicacion:"",
    idUsuarioVendedor:this.userService.getInfoToken(),
    idVehiculo:'',
    vehiculo:''
  }

  validateSemiremolque():void{
    this.formRemolque = this.fb.group({
      _id : new FormControl('', [Validators.required,Validators.pattern('^[0-9]{1,4}(?!.*(LL|CH))[BCDFGHJKLMNPRSTVWXYZ]{3}$')]),
      tipoSemiremolque: new FormControl('',[Validators.required]),
      tipoEje: new FormControl('',[Validators.required]),
      ADR: new FormControl('',[Validators.required]),
      titulo: new FormControl('',[Validators.required]),
      tipo_publicacion: new FormControl('',[Validators.required]),
      idVehiculo:new FormControl('',[Validators.required]),
      precio:new FormControl('',[Validators.required]),
      marca:new FormControl('',[Validators.required]),
      ejes:new FormControl('',[Validators.required]),
      mma:new FormControl('',[Validators.required]),
      fechaMatriculacion:new FormControl('',[Validators.required]),
      modelo:new FormControl('',[Validators.required]),
      color:new FormControl('',[Validators.required]),
    })
  }



  ingresarRemolque(){
    this.formData.append('_id',this.semiremolque._id),
    this.formData.append('tipoSemiremolque',this.semiremolque.tipoSemiremolque),
    this.formData.append('tipoEje',this.semiremolque.tipoEje),
    this.formData.append('ADR',JSON.stringify(this.semiremolque.ADR)),
    this.formData.append('titulo',this.semiremolque.titulo),
    this.formData.append('tipo_publicacion',this.semiremolque.tipo_publicacion),
    this.formData.append('idVehiculo',this.semiremolque.idVehiculo),
    this.formData.append('mma',this.semiremolque.mma),
    this.formData.append('fechaMatriculacion',this.semiremolque.fechaMatriculacion),
    this.formData.append('Marca',this.semiremolque.Marca),
    this.formData.append('modelo',this.semiremolque.modelo),
    this.formData.append('precio',this.semiremolque.precio),
    this.formData.append('color',this.semiremolque.color),
    this.formData.append('idUsuarioVendedor',this.semiremolque.idUsuarioVendedor),
    this.formData.append('vehiculo',this.semiremolque.vehiculo),
    this.formData.append('tipoVehiculo',this.semiremolque.tipoVehiculo),
    this.formData.append('ejes',this.semiremolque.ejes),    

    this.postservice.registroPostSemiRemolque(this.formData).subscribe(
      res =>{
        if (res.status === 'Ingresado Correctamente') {
          this.route.navigate(['/mainUser']); 
        }
    },
      err=>
        console.log(err)
    )
  }

  imagenesChange(event){
    for (let index = 0; index < event.target.files.length; index++) {
      console.log(event.target.files);
      this.imagenesArray = event.target.files[index];
      this.formData.append('media',this.imagenesArray);
    }
  }
}
