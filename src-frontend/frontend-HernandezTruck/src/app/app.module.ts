import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';


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
import { InputComponent } from './components/Inputs/input/input.component';
import { ReactiveFormsModule } from "@angular/forms";
import { InputEmailComponent } from './components/Inputs/input-email/input-email.component';
import { InputDNIComponent } from './components/Inputs/input-dni/input-dni.component';
import { InputTelefonoComponent } from './components/Inputs/input-telefono/input-telefono.component';
import { InputCCAAComponent } from './components/Inputs/input-ccaa/input-ccaa.component';
import { InputPasswordComponent } from './components/Inputs/input-password/input-password.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavigationComponent,
    SkeletonComponent,
    RegistroComponent,
    LoginComponent,
    InputComponent,
    InputEmailComponent,
    InputDNIComponent,
    InputTelefonoComponent,
    InputCCAAComponent,
    InputPasswordComponent  
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
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
