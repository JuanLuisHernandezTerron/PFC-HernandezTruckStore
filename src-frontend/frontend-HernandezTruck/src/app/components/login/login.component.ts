import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from "./../../services/auth.service";
import { Router } from "@angular/router";
import { UserService } from "./../../services/Usuario/user.service";
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
    private fb: FormBuilder,
    private userService: UserService) {
      this.validatorLogin();
}

ngOnInit(): void {
  let backdrop = document.querySelector('.modal-backdrop') as HTMLDivElement;
  if (backdrop!= null) {
    backdrop.remove();
  }
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
      if (this.userService.getRol() === 'administrador') {
        this.router.navigateByUrl('/DashboardAdmin').then(()=>{window.location.reload()});
      }else{
        this.router.navigateByUrl('/mainUser').then(()=>{window.location.reload()});
      }

      },
      err =>
      console.log(err),
    )
    return true;
  }
  }
}
