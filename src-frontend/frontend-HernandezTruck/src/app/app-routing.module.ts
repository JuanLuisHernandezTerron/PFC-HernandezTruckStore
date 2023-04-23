import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Componentes
import { RegistroComponent } from "./components/registro/registro.component";
import { LoginComponent } from "./components/login/login.component";
import { VehiculosComponent } from "./components/vehiculos/vehiculos.component";
import { SkeletonComponent } from "./layout/skeleton/skeleton.component";
import { MainAdministradorComponent } from "./../app/components/main/Administrador/main-administrador/main-administrador.component";
import { MainUserComponent } from "./../app/components/main/Usuario/main-user/main-user.component";

//Guards
import { AuthGuard } from "./guards/auth.guard";
import { UsersGuardGuard } from "./guards/users-guard.guard";
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
    { path: 'mainUser', component:MainUserComponent, canActivate:[AuthGuard]}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
