import { Component,OnInit } from '@angular/core';
import { UserService } from 'src/app/services/Usuario/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.scss']
})
export class FavoritosComponent implements OnInit{
  constructor (private userService : UserService,
              private authService : AuthService) { }
  
  arraydatos: Array<Usuario> = [];

  ngOnInit(): void {
    let id = this.userService.getInfoToken();
    this.userService.getInfoUsuarioID(id).subscribe((data)=>{
      data.consulta.favoritos.forEach(element => {
        this.arraydatos.push(element)
      });
    })   
    console.log(this.arraydatos) 
  }

  noOperacion(){
    return (this.arraydatos.length === 0) ?  true : false;
  }

}
