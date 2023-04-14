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
          console.log(res),
          localStorage.setItem('token',res.token);
            this.router.navigate(['/vehiculos']);
        },
        err =>
          console.log(err),
      )
  }
}
