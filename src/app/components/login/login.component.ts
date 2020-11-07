import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../usuarios/usuario';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  usuario: Usuario;

  constructor(private authService: AuthService, private router: Router) {
    this.usuario = new Usuario();    
    this.usuario.email = 'edwintumax@gmail.com';
    this.usuario.password = 'Guatemala.2020';
   }

  ngOnInit(): void {
  }

  login(): void {
    
    
    if(this.usuario.email == null || this.usuario.password == null){
     swal.fire({
          icon: 'error',
          title: 'Error Login',
          text: `Username o password vacios!!!`,
          footer: 'Kalum'
      });
      return;
    }

    this.authService.login(this.usuario).subscribe(response =>{
      this.authService.guardarToken(response.token);
      this.authService.guardarUsuario(response.token);
      this.usuario = this.authService.usuario;
      this.router.navigate(['/home']);
      swal.fire({
        icon: 'success',
        title: 'Login success',
        text: `Bienvenido ${this.usuario.email}`,
        footer: 'Kalum'
      });
    }, error => {
      if(error.status == 400){
        swal.fire({
          icon: 'error',
          title: 'Error Login',
          text: 'Username o passwordd incorrectos!!!',
          footer: 'Kalum'
        });
      }
    });
  }

}
