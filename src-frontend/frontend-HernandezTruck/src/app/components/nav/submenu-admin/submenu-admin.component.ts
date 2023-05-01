import { Component,OnInit } from '@angular/core';
import { NavigationComponent } from "./../../../layout/navigation/navigation.component";
import { UserService } from 'src/app/services/Usuario/user.service';
import { Usuario } from 'src/app/models/usuario';
@Component({
  selector: 'app-submenu-admin',
  templateUrl: './submenu-admin.component.html',
  styleUrls: ['./submenu-admin.component.scss']
})

export class SubmenuAdminComponent implements OnInit{
  constructor(private navigation: NavigationComponent,
              private userService: UserService){

  }

  userAUX={
    nombre:"JHT",
    nombreCompleto: 'Juan Luis Hernandez Terron'
  }

  user:Usuario;

  ngOnInit(): void {
    this.userService.userInformacion.subscribe((data)=>{
      this.user = data
    })
  }

  getRol():void{
    this.navigation.getRol();
  }

  logout(){
    this.navigation.logout();
  }
  
}
