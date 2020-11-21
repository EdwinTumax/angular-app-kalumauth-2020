import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import { UsuariosService } from '../../services/usuarios.service';
import { Router, ActivatedRoute } from '@angular/router';
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

  titulo: string;

  constructor(private usuariosService : UsuariosService, 
    private router: Router, 
    private activatedRouter: ActivatedRoute ) { }

  ngOnInit(): void {
    this.activatedRouter.paramMap.subscribe( params => {
      const id = params.get('id');
      if(id){
        this.titulo = 'EDITAR'
        this.usuariosService.getUSuario(id)
          .subscribe((usuario) => {
            console.log(usuario);
            this.usuario = usuario });
      }else{
        this.titulo = 'NUEVO'
      }
    })
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

  update() : void {
    console.log(this.usuario);
    this.usuariosService.update(this.usuario).subscribe(
      json => {
        this.router.navigate(['/usuarios']);
        swal.fire('Usuarios',`Se actualizo el registro exitosamente!!!`,'success');
      },
      err => {
        this.error = err.error;
      }
    );
  }
}
