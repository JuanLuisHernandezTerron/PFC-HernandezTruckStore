import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from "./../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin !:FormGroup;
  hide = true;

  constructor (private authservice: AuthService,
    private router: Router,
    private fb: FormBuilder) {
      this.validatorLogin();
}

ngOnInit(): void {

}

validatorLogin():void{
  this.formLogin = this.fb.group({
    email : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required,Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$')])
  });
}

user = {
  email: '',
  contrasena: ''
}



login(){
  console.log(this.user);
  if (this.user.contrasena === "" || this.user.email === "") {
    return "Introduce Correctamente los datos de login, por favor";
  }else{
    this.authservice.login(this.user)
    .subscribe(
      res =>{
      console.log(res),
      localStorage.setItem('token',res.token);
        this.router.navigate(['/vehiculos']);
      },
      err =>
      console.log(err),
    )
    return true;
  }
  }
}
