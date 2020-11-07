import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../components/usuarios/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  token = '';
  
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json',
    'Access-Control-Allow-Headers':'Content-Type'});

  constructor(private httpClient: HttpClient) {
  }

  getUsuarios() {
    return this.httpClient.get('https://localhost:5007/KalumAutenticacion/v1/Usuarios', {headers: this.httpHeaders})
  }
  
  create(usuario: Usuario) : Observable<Usuario>{
    return this.httpClient.post<Usuario>('https://localhost:5007/KalumAutenticacion/v1/Cuentas/Crear', usuario ,{headers: this.httpHeaders})
  }
  
  delete( id: string) : Observable<Usuario>{
    return this.httpClient.delete<Usuario>(`https://localhost:5007/KalumAutenticacion/v1/usuarios/${id}`,{headers: this.httpHeaders});
  }


}
