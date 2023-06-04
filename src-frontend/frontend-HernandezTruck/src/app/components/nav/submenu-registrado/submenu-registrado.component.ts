import { Component,OnInit } from '@angular/core';
import { NavigationComponent } from "./../../../layout/navigation/navigation.component";
import { UserService } from 'src/app/services/Usuario/user.service';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-submenu-registrado',
  templateUrl: './submenu-registrado.component.html',
  styleUrls: ['./submenu-registrado.component.scss']
})
export class SubmenuRegistradoComponent implements OnInit{
  constructor(private navigation: NavigationComponent,
    private userService: UserService){

  }
  user:Usuario;

  ngOnInit(): void {
    this.navigation.getRol();
    this.userService.userInformacion.subscribe((data)=>{
      this.user = data
    })

    if (!localStorage.getItem('token')) {
      this.logout()
    }
  }

  logout(){
    this.navigation.logout();
  }
}
