import { Component, OnInit } from '@angular/core';
import {AuthService} from '././../../../../services/auth.service';

@Component({
  selector: 'app-register-detallado',
  templateUrl: './register-detallado.component.html',
  styleUrls: ['./register-detallado.component.scss']
})
export class RegisterDetalladoComponent implements OnInit {
  constructor (public authservice: AuthService) { }

  ngOnInit(): void {
    
  }
}
