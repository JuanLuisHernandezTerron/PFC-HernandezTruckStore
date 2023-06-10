import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import { AuthService } from "./../../../services/auth.service";
import { Router } from "@angular/router";
import { UserService } from 'src/app/services/Usuario/user.service';
import { ChangeDetectorRef } from '@angular/core';

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
    dni:'',
    telefono:'',
    direccion:''
  }

  passwd={
    contrasenaAntigua: '',
    contrasenaActual:'',
    email:''
  }

  constructor (private authservice: AuthService,
              private router: Router,
              private fb: FormBuilder,
              private userService: UserService,
              private cdref: ChangeDetectorRef,
              ) {
        this.validatorRegister();
  }

  ngOnInit(): void {
    let idUser = this.userService.getInfoToken()
    this.userService.getInfoUsuarioID(idUser).subscribe((data)=>{
      this.user.nombre = data.consulta.nombre;
      this.user.apellidos = data.consulta.apellidos;
      this.user.email = data.consulta.email;
      this.user.dni = data.consulta.dni;
      this.user.telefono = data.consulta.telefono;
      this.user.direccion = data.consulta.direccion;
      this.cdref.detectChanges();
    })
  }

  validatorRegister():void{
    this.formGroup = this.fb.group({
      nombre : new FormControl('', [Validators.required, Validators.minLength(5)]),
      apellidos : new FormControl('', [Validators.required, Validators.minLength(5)]),
      email : new FormControl({value:'',disabled:true}, [Validators.required, Validators.email]),
      password : new FormControl('', [Validators.required,Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$')]),
      ConfirmPassword : new FormControl('', [Validators.required]),
      DNI : new FormControl({value:'',disabled:true}, [Validators.required,Validators.pattern('^[0-9]{8,8}[A-Za-z]$')]),
      telefono : new FormControl('',[Validators.required, Validators.pattern("^[0-9]{9}$")]),
      direccion : new FormControl('', [Validators.required])
    });
  }

  /*
  * value: valor del input
  * typerror: tipo de validacion
  */
  public validatorInput= (valueInput:string,typeError:string)=>{
    return this.formGroup.controls[valueInput].hasError(typeError)
  }

  changePasswd(){
    let warning = document.getElementById('dangerWarningPasswd');

    this.userService.updatePassword(this.passwd).subscribe((data)=>{      
      if(data.status == 'Password Actualizado Correctamente'){
        warning.classList.remove('credentails');
        window.location.reload();
      }else{        
        warning.classList.add('credentails');
      }
    })
  }

  registro():void{
    this.userService.updateUser(this.user).subscribe((data)=>{
      if(data.status === 'Usuario Actualizado Correctamente'){
        window.location.reload();
      }
    })
  }
}