import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Componentes
import { RegistroComponent } from "./components/registro/registro.component";
import { LoginComponent } from "./components/login/login.component";
import { VehiculosComponent } from "./components/vehiculos/vehiculos.component";
import { SkeletonComponent } from "./layout/skeleton/skeleton.component";
import { MainAdministradorComponent } from "./../app/components/main/Administrador/main-administrador/main-administrador.component";
import { MainUserComponent } from "./../app/components/main/Usuario/main-user/main-user.component";
import { Publicacion1Component } from './components/publicacion1/publicacion1.component';
import { DatosCabezaComponent } from './components/datos-cabeza/datos-cabeza.component';
import { DatosRemolqueComponent } from './components/datos-remolque/datos-remolque.component';
//Guards
import { AuthGuard } from "./guards/auth.guard";
import { UsersGuardGuard } from "./guards/users-guard.guard";
import { PostGuardGuard } from './guards/post-guard.guard';
const routes: Routes = [{
  path:'',
  component: SkeletonComponent,
  pathMatch:'prefix',
  children:[
    { path: 'register', component: RegistroComponent},
    { path: 'login', component: LoginComponent},
    { path: 'vehiculos', component: VehiculosComponent, canActivate:[AuthGuard]},
    { path: 'DashboardAdmin', component:MainAdministradorComponent, canActivate:[UsersGuardGuard],data:{
      role:'administrador'
    }},
    { path: 'mainUser', component:MainUserComponent, canActivate:[AuthGuard]},
    { path: 'publicacionStep1', component:Publicacion1Component, canActivate:[PostGuardGuard]},
    { path: 'datosCabezaTractora', component:DatosCabezaComponent, canActivate:[PostGuardGuard]},
    { path: 'datosSemiremolque', component:DatosRemolqueComponent, canActivate:[PostGuardGuard]}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
