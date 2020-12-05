import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from './usuario'
import swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {
  usuario: Usuario;
  usuarios: any[] = [];
  paginador: any;

  constructor(private usuariosService: UsuariosService, private activatedRoute: ActivatedRoute) {  
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let page:number = +params.get('page');
      if(!page){
        page = 0;
      }
      this.usuariosService.getUsuariosPage(page).subscribe(response => {
        this.usuarios = response.content as Usuario[];
        this.paginador = response;
      });
    });
    
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
        this.usuariosService.delete(usuario.id).subscribe(() => {
          this.usuarios = this.usuarios.filter(elemento => elemento !== usuario);
          swal.fire('Eliminar usuario',
            'Registro eliminado!!!','success');
        });
      }
    });
  } 

  editar(usuario: Usuario) : void {
    console.log(usuario);
  }

}
