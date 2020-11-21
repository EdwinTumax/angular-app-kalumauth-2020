import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../components/usuarios/usuario';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  endPoint = 'https://localhost:5007/KalumAutenticacion/v1';

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>( `${this.endPoint}/Usuarios`)
  }
  
  create(usuario: Usuario) : Observable<Usuario>{
    return this.httpClient.post<Usuario>(`${this.endPoint}/Cuentas/Crear`, usuario )
  }
  
  delete( id: string) : Observable<Usuario>{
    return this.httpClient.delete<Usuario>(`${this.endPoint}/usuarios/${id}`)
      .pipe(catchError( e => {
        if(e){
          console.log(e);
        }
        return throwError(e);
      }));    
  }

  getUSuario(id) : Observable<Usuario>{
    return this.httpClient.get<Usuario>(`${this.endPoint}/usuarios/${id}`).pipe(
      catchError( e => {
        if(e.status != 401){
          this.router.navigate(['/usuarios']);
        }
        return throwError(e);
      })
    );
  }

  update(usuario: Usuario) : Observable<any> {
    return this.httpClient.put<any>(`${this.endPoint}/usuarios/${usuario.id}`,usuario).pipe(
      catchError( e => {
        return throwError(e);
      })
    );
  }

}
