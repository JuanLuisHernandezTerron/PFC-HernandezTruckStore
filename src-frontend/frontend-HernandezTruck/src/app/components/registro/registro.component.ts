import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
}) 

export class RegistroComponent implements OnInit {
  
  email = new FormControl('', [Validators.required, Validators.email]);
  ciudad = new FormControl('', [Validators.required]);
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Introduce un valor';
    }

    return this.email.hasError('email') ? 'El email no es valido' : '';
  }

  hide = true;

  user = {
    nombre: '',
    apellidos : '',
    email: '',
    contrasena: '',
    contrasenaAUX: '',
    rol:'',
    dni:'',
    telefono:'',
    direccion:''
  }

  userAUX = {
    nombre: '',
    apellidos : '',
    email: '',
    contrasena: '',
    rol:'',
    dni:'',
    telefono:'',
    direccion:''
  }


  constructor () {

  }

  ngOnInit(): void {
  }

  registro():void{
    console.log(this.user)
  }
}
