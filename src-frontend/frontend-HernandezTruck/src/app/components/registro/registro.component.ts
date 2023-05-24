import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from "./../../services/auth.service";
import { Validate } from "./matchPWD";
import { Router } from "@angular/router";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
}) 

export class RegistroComponent implements OnInit {
  
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
              private fb: FormBuilder) {
    this.validatorRegister();
  }

  ngOnInit(): void {
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
    this.authservice.registro(this.user)
      .subscribe(
        res =>{
          console.log(res)
          if (res.status === 'Ingresado Correctamente') {
            localStorage.setItem('token',res.token);
            this.router.navigateByUrl('/mainUser');
          }else{
            this.router.navigateByUrl('/register');
          }
        },
        err =>
          {
            console.log(err);
            if (err.error === 'Email ya existente' || err.error === 'Usuario no registrado') {
              let warning = document.getElementById('dangerWarning');
              warning.classList.add('credentails');
            }
          }
      )
  }
}
