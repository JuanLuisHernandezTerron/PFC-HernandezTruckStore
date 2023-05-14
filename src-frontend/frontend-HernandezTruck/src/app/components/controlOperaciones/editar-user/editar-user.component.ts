import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from "./../../../services/auth.service";
import { Router } from "@angular/router";
import { Validate } from "./../../registro/matchPWD";
import { UserService } from 'src/app/services/Usuario/user.service';

@Component({
  selector: 'app-editar-user',
  templateUrl: './editar-user.component.html',
  styleUrls: ['./editar-user.component.scss']
})
export class EditarUserComponent implements OnInit{
  formGroup !: FormGroup;  

  hide = true;

  user = {
    nombre: '',
    apellidos : '',
    email: '',
    contrasena: '',
    contrasenaAUX: '',
    dni:'',
    telefono:'',
    direccion:''
  }

  constructor (private authservice: AuthService,
              private router: Router,
              private fb: FormBuilder,
              private userService: UserService) {
    this.validatorRegister();
  }



  ngOnInit(): void {
    let idUser = this.userService.getInfoToken()
    this.userService.getInfoUsuarioID(idUser).subscribe((data)=>{
      console.log(data.consulta)
      this.user.nombre = data.consulta.nombre;
      this.user.apellidos = data.consulta.apellidos;
      this.user.email = data.consulta.email;
      this.user.dni = data.consulta.dni;
      this.user.telefono = data.consulta.telefono;
      this.user.direccion = data.consulta.direccion;
    })
  }

  validatorRegister():void{
    this.formGroup = this.fb.group({
      nombre : new FormControl('', [Validators.required, Validators.minLength(5)]),
      apellidos : new FormControl('', [Validators.required, Validators.minLength(5)]),
      email : new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl('', [Validators.required,Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$')]),
      ConfirmPassword : new FormControl('', [Validators.required]),
      DNI : new FormControl('', [Validators.required,Validators.pattern('^[0-9]{8,8}[A-Za-z]$')]),
      telefono : new FormControl('',[Validators.required, Validators.pattern("^[0-9]{9}$")]),
      direccion : new FormControl('', [Validators.required])
    },{
      validator: Validate.MatchPassword,
    });
  }

  /*
  * value: valor del input
  * typerror: tipo de validacion
  */
  public validatorInput= (valueInput:string,typeError:string)=>{
    return this.formGroup.controls[valueInput].hasError(typeError)
  }

  registro():void{

  }
}
