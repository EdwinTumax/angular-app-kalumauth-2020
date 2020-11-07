import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-usuario',
  templateUrl: './formulario-usuario.component.html',
  styles: [
  ]
})
export class FormularioUsuarioComponent implements OnInit {

  usuario: Usuario = new Usuario();

  error: string;

  constructor(private usuariosService : UsuariosService, private router: Router) { }

  ngOnInit(): void {
  }

  crear() : void {
    this.usuariosService.create(this.usuario)
      .subscribe(usuario => {        
        let mensaje = `El usuario ${usuario.normalizedUserName} ha sido creado con éxito`;
        this.router.navigate(['/usuarios']);
        swal.fire('Nuevo usuario',
          mensaje,'success');
      },
      e => {
        /*swal.fire({
          icon: 'error',
          title: 'Error al crear el usuario',
          text: `${e.error}`,
          footer: 'Kalum'
        })*/        
        this.error = e.error
      })
  }
}
