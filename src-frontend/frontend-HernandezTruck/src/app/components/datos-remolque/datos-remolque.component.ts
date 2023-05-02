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


  formRemolque !: FormGroup;
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
    this.postservice.registroPostTractora(this.semiremolque).subscribe(
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
