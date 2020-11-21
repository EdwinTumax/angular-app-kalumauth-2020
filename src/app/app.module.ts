import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
// Interceptores
import { TokenInterceptor } from './components/interceptors/token.interceptor';
import { AuthInterceptor } from './components/interceptors/auth.interceptor';
// Rutas
import { APPROUTING } from './app.routes';
// Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { RolesComponent } from './components/roles/roles.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/shared/footer/footer.component';
// Services
import { UsuariosService } from './services/usuarios.service';
import { FormularioUsuarioComponent } from './components/usuarios/formulario-usuario.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UsuariosComponent,
    RolesComponent,
    HomeComponent,
    FooterComponent,
    FormularioUsuarioComponent,
    LoginComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    APPROUTING
  ],
  providers: [UsuariosService, 
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
