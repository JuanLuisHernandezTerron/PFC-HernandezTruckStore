import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule } from "@angular/material/input";
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import {MatAutocompleteModule} from '@angular/material/autocomplete';


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

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavigationComponent,
    SkeletonComponent,
    RegistroComponent,
    LoginComponent,
    VehiculosComponent
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
    MatAutocompleteModule
  ],
  //Con interceptor creamos una cabecera
  providers: [AuthGuard
    ,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
