import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { AuthService } from "./../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor (private authservice: AuthService,
    private router: Router) {

}

user = {
  email: '',
  contrasena: ''
}

ngOnInit(): void {
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
