import { Component,OnInit } from '@angular/core';
import { NavigationComponent } from "./../../../layout/navigation/navigation.component";
@Component({
  selector: 'app-submenu-registrado',
  templateUrl: './submenu-registrado.component.html',
  styleUrls: ['./submenu-registrado.component.scss']
})
export class SubmenuRegistradoComponent implements OnInit{
  constructor(private navigation: NavigationComponent){

  }

  userAUX={
    nombre:"JHT",
    nombreCompleto: 'Juan Luis Hernandez Terron'
  }

  ngOnInit(): void {
    this.navigation.getRol();

  }

  logout(){
    this.navigation.logout();
  }
}
