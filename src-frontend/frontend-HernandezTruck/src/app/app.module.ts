import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule } from "@angular/material/input";
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {ClipboardModule} from '@angular/cdk/clipboard';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MaterialModule } from './material/material.module';
import { FooterComponent } from './layout/footer/footer.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { SkeletonComponent } from './layout/skeleton/skeleton.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from "@angular/forms";
import { VehiculosComponent } from './components/vehiculos/vehiculos.component';

import { TokenInterceptorService } from "./services/token-interceptor.service";
import { AuthGuard } from "./guards/auth.guard";
import { MainAdministradorComponent } from './components/main/Administrador/main-administrador/main-administrador.component';
import { MainUserComponent } from './components/main/Usuario/main-user/main-user.component';
import { SliderNoticiasComponent } from './components/slider-noticias/slider-noticias.component';
import { SubmenuRegistradoComponent } from './components/nav/submenu-registrado/submenu-registrado.component';
import { SubmenuAdminComponent } from './components/nav/submenu-admin/submenu-admin.component';
import { UserService } from './services/Usuario/user.service';
import { Publicacion1Component } from './components/publicacion1/publicacion1.component';
import { DatosCabezaComponent } from './components/datos-cabeza/datos-cabeza.component';
import { DatosRemolqueComponent } from './components/datos-remolque/datos-remolque.component';
import { TractoraInformacionComponent } from './components/mainInformacion/Tractora/tractora-informacion/tractora-informacion.component';
import { SemiremolqueInformacionComponent } from './components/mainInformacion/SemiRemolque/semiremolque-informacion/semiremolque-informacion.component';
import { RegisterDetalladoComponent } from './components/informacionDetalladaPost/registrado/register-detallado/register-detallado.component';
import { BooleanSiNoPipe } from './Pipe/boolean-si-no.pipe';
import { EliminatedNumbersPipe } from './Pipe/eliminated-numbers.pipe';
import { ControlOperacionesComponent } from './components/controlOperaciones/control-operaciones/control-operaciones.component';
import { FavoritosComponent } from './components/controlOperaciones/favoritos/favoritos.component';
import { MisPostsComponent } from './components/controlOperaciones/mis-posts/mis-posts.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavigationComponent,
    SkeletonComponent,
    RegistroComponent,
    LoginComponent,
    VehiculosComponent,
    MainAdministradorComponent,
    MainUserComponent,
    SliderNoticiasComponent,
    SubmenuRegistradoComponent,
    SubmenuAdminComponent,
    Publicacion1Component,
    DatosCabezaComponent,
    DatosRemolqueComponent,
    TractoraInformacionComponent,
    SemiremolqueInformacionComponent,
    RegisterDetalladoComponent,
    BooleanSiNoPipe,
    EliminatedNumbersPipe,
    ControlOperacionesComponent,
    FavoritosComponent,
    MisPostsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    FormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    RouterModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    ClipboardModule
  ],
  //Con interceptor creamos una cabecera
  providers: [UserService,AuthGuard
    ,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
