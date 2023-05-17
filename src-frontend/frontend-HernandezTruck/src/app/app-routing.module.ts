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
import { TractoraInformacionComponent } from './components/mainInformacion/Tractora/tractora-informacion/tractora-informacion.component';
import { SemiremolqueInformacionComponent } from './components/mainInformacion/SemiRemolque/semiremolque-informacion/semiremolque-informacion.component';
import { RegisterDetalladoComponent } from './components/informacionDetalladaPost/registrado/register-detallado/register-detallado.component';
import { ControlOperacionesComponent } from './components/controlOperaciones/control-operaciones/control-operaciones.component';
import { FavoritosComponent } from './components/controlOperaciones/favoritos/favoritos.component';
import { MisPostsComponent } from './components/controlOperaciones/mis-posts/mis-posts.component';  
import { EditarPostComponent } from './components/controlOperaciones/editar-post/editar-post.component';
import { EditarPostRemolqueComponent } from './components/controlOperaciones/editar-post-remolque/editar-post-remolque.component';
import { EditarUserComponent } from './components/controlOperaciones/editar-user/editar-user.component';
import { ReportPostAdminComponent } from './components/admin/report-post-admin/report-post-admin.component';
import { EstadisticasAdminComponent } from './components/admin/estadisticas-admin/estadisticas-admin.component';
//Guards
import { AuthGuard } from "./guards/auth.guard";
import { UsersGuardGuard } from "./guards/users-guard.guard";
import { PostGuardGuard } from './guards/post-guard.guard';
const routes: Routes = [{
  path:'',
  component: SkeletonComponent,
  pathMatch:'prefix',
  children:[
    { path: '', component: MainUserComponent},
    { path: 'register', component: RegistroComponent},
    { path: 'login', component: LoginComponent},
    { path: 'vehiculos', component: VehiculosComponent, canActivate:[AuthGuard]},
    { path: 'DashboardAdmin', component:MainAdministradorComponent, canActivate:[UsersGuardGuard],data:{
      role:'administrador'
    }},
    { path: 'mainUser', component:MainUserComponent, canActivate:[AuthGuard]},
    { path: 'publicacionStep1', component:Publicacion1Component, canActivate:[PostGuardGuard]},
    { path: 'datosCabezaTractora', component:DatosCabezaComponent, canActivate:[PostGuardGuard]},
    { path: 'datosSemiremolque', component:DatosRemolqueComponent, canActivate:[PostGuardGuard]},
    { path: 'informacionAllTractoras', component:TractoraInformacionComponent},
    { path: 'informacionAllSemiRemolques', component:SemiremolqueInformacionComponent},
    { path: 'informacionDetalladaVehicle/:title', component:RegisterDetalladoComponent},
    { path: 'controlOperaciones', component:ControlOperacionesComponent,canActivate:[AuthGuard] },
    { path: 'postFavoritos', component:FavoritosComponent,canActivate:[AuthGuard] },
    { path: 'misPosts', component:MisPostsComponent,canActivate:[AuthGuard] },
    { path: 'editarPostTractora/:id', component:EditarPostComponent,canActivate:[AuthGuard] },
    { path: 'editarPostRemolque/:id', component:EditarPostRemolqueComponent,canActivate:[AuthGuard] },
    { path: 'editarUser', component:EditarUserComponent,canActivate:[AuthGuard] },
    { path: 'reportPost', component:ReportPostAdminComponent,canActivate:[UsersGuardGuard] },
    { path: 'estadisticas', component:EstadisticasAdminComponent,canActivate:[UsersGuardGuard] },
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
