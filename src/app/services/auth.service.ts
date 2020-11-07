import { Injectable } from '@angular/core';
import { Usuario } from '../components/usuarios/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _usuario: Usuario
  private _token: string;

  constructor(private httpClient: HttpClient) { }

  login(usuario: Usuario): Observable<any>{
    console.log(usuario);
    const urlEndPoint = 'https://localhost:5007/KalumAutenticacion/v1/Cuentas/Login';
    const httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json'
    })
    return this.httpClient.post(urlEndPoint,usuario, {headers: httpHeaders});
  }

  public get usuario(): Usuario {
    if(this._usuario != null){
      return this._usuario;
    } else if(this._usuario == null && sessionStorage.getItem('usuario') != null) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }

  public get token() : string {
    if(this._token != null){
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null){
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  guardarUsuario(accesToken: string) : void {
    const payload = this.obtenerDatosToken(accesToken);
    this._usuario = new Usuario();
    this._usuario.userName = payload.unique_name
    this._usuario.email = payload.unique_name
    sessionStorage.setItem('usuario',JSON.stringify(this._usuario));
  }

  guardarToken(accessToken: string) : void{
    this._token = accessToken;
    sessionStorage.setItem('token',accessToken);
  }

  obtenerDatosToken(accessToken: string): any{
    if(accessToken != null){
      return JSON.parse(atob(accessToken.split('.')[1]))      
    }
    return null;
  }

  logout() : void {
    this._token = null;
    this._usuario = null;
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
  }

  isAuthenticated() : boolean {
    const payload = this.obtenerDatosToken(this.token);
    if(payload != null && payload.unique_name && payload.unique_name.length > 0){
      return true;
    }
    return false;
  }

  isTokenExpired() : boolean {
    const now = new Date().getTime() / 1000;
    if(this.obtenerDatosToken(this.token).exp < now){
      return true;
    }
    return false;
  }


}
