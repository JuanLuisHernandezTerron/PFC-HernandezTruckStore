import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "./../../services/auth.service";
import { Router } from "@angular/router";
import { UserService } from "./../../services/Usuario/user.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin !: FormGroup;
  hide = true;

  constructor(private authservice: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService) {
    this.validatorLogin();
  }

  ngOnInit(): void {
    let backdrop = document.querySelector('.modal-backdrop') as HTMLDivElement;
    if (backdrop != null) {
      backdrop.remove();
    }
  }

  validatorLogin(): void {
    this.formLogin = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$')])
    });
  }

  user = {
    email: '',
    contrasena: ''
  }

  envioPasswd() {
    let emailValue = document.querySelectorAll('input')[3].value;
    let warning = document.getElementById('dangerWarningPasswd');
    let emailObject = {
      email: emailValue
    }
    this.userService.cambioPwdOlvidate(emailObject).subscribe((data:any) => {     
      if (data.status != 'Email No Enviado Correctamente | No existe en la BD') {
        this.router.navigateByUrl('/login')
        warning.classList.remove('credentailsPasswd');
      }else{
        warning.classList.add('credentailsPasswd');
      }
    })
  }


  login() {
    if (this.user.contrasena === "" || this.user.email === "") {
      return false;
    } else {
      this.authservice.login(this.user)
        .subscribe(
          res => {
            localStorage.setItem('token', res.token);
            if (this.userService.getRol() === 'administrador') {
              this.router.navigateByUrl('/DashboardAdmin').then(() => { window.location.reload() });
            } else {
              this.router.navigateByUrl('/mainUser').then(() => { window.location.reload() });
            }

          },
          err => {
            if (err.error.error === 'Email incorrecto o contraseña incorrecta') {
              let warning = document.getElementById('dangerWarning');
              warning.classList.add('credentails');
            }
          }
        )
      return true;
    }
  }
}
