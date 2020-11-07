import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from './usuario'
import swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {
  usuario: Usuario;
  usuarios: any[] = [];

  constructor(private usuariosService: UsuariosService) {
    this.usuariosService.getUsuarios().subscribe((data: any) =>{
      this.usuarios = data;
    })
   }

  ngOnInit(): void {
  }

  eliminar(usuario: Usuario) : void {
    swal.fire({
      title: 'Está seguro?',
      text: `Seguro que desea eliminar el usuario ${usuario.userName}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',    reverseButtons: true
    }).then((resultado) =>{
      if (resultado.isConfirmed) {
        this.usuariosService.delete(usuario.id).subscribe((data: any) =>{
          swal.fire('Eliminar usuario',
            'Registro eliminado!!!','success');
        });
      }
    });
  } 

}
