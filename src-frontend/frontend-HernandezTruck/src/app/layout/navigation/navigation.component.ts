import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AuthService} from '././../../services/auth.service';
import { UserService } from "./../../services/Usuario/user.service";
import { Router } from "@angular/router";

export interface User {
  name: string;
}
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit{
  constructor(public Userservice: UserService,
              public authservice: AuthService,
              private router:Router){

  }

  userAUX={
    nombre:"JHT",
    nombreCompleto: 'Juan Luis Hernandez Terron'
  }

  myControl = new FormControl<string | User>('');
  options: User[] = [{name: 'Cabeza Tractora Volvo'}, {name: 'Cabeza Tractora MAN'}, {name: 'Schmitz'}];
  filteredOptions: Observable<User[]> | undefined;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
    const valores = this.Userservice.getInfoUsuario(this.getRol()).subscribe((data) => console.log(data));
    console.log(valores);
    let backdrop = document.querySelector('.modal-backdrop') as HTMLDivElement;
    if (backdrop!= null) {
      backdrop.remove();
    }
  }

  getRol(){
    return this.Userservice.getRol();
  }
  
  logout():any{
    this.authservice.logout();
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }
}
