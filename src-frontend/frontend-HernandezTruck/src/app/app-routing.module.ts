import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Componentes
import { RegistroComponent } from "./components/registro/registro.component";
import { LoginComponent } from "./components/login/login.component";
import { SkeletonComponent } from "./layout/skeleton/skeleton.component";

const routes: Routes = [{
  path:'',
  component: SkeletonComponent,
  pathMatch:'prefix',
  children:[
    { path: 'register', component: RegistroComponent},
    { path: 'login', component: LoginComponent},

  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
