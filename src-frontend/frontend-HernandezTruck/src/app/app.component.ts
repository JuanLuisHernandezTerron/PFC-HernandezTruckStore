import { Component ,OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UserService } from './services/Usuario/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  title = 'frontend-HernandezTruck';
  
  constructor(private authService : AuthService,
              private userService : UserService){ }

  ngOnInit(): void {
    let infoToken = this.userService.getInfoToken();
    if (infoToken) {
    this.userService.getInfoUsuarioID(infoToken).subscribe((data)=>{
      this.userService.setUsuario(data.consulta);
    })
    }
  }
}
