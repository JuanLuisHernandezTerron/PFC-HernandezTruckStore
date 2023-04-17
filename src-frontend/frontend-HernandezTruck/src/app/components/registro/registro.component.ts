import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { AuthService } from "./../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
}) 

export class RegistroComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  global = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  DNI = new FormControl('', [Validators.required,Validators.pattern('^[0-9]{8,8}[A-Za-z]$')]);
  
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Introduce un valor por favor';
    }

    return this.email.hasError('email') ? 'El email no es valido' : '';
  }

  getErrorMessageGlobal() {
    if (this.global.hasError('required')) {
      return 'Introduce un valor por favor';
    }
    return "";
  }

  getErrorMessagePassword() {
    if (this.password.hasError('required')) {
      return 'Introduce un valor por favor';
    }
    return this.password.hasError('password') ? 'La contraseña no es valida' : '';
  }

  getErrorMessageDNI() {
    if (this.DNI.hasError('pattern')) {
      return 'El DNI no es valido';
    }
    return this.DNI.hasError('required') ? 'Introduce un valor por favor' : '';
  }


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
              private router: Router,) {

  }

  ngOnInit(): void {
  }

  registro():void{
    this.authservice.registro(this.user)
      .subscribe(
        res =>{
          console.log(res)
          if (res.status === 'Ingresado Correctamente') {
            localStorage.setItem('token',res.token);
            this.router.navigate(['/vehiculos']);
          }
        },
        err =>
          console.log(err),
      )
  }
}
