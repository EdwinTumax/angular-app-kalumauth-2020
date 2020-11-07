import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  username: string;

  private _email: string;
  private _authenticated: boolean;

  public get email(): string {
    if(this.authService != null){
      return this.authService.usuario.email;
    }
  }

  public get authenticated() : boolean {
    if(this.authService != null){
      return this.authService.isAuthenticated();
    }
  }


  constructor(private authService: AuthService, private router: Router) {
    this.username = authService.usuario.userName;
   }

  ngOnInit(): void {
  }

  logout(): void{
    const username = this.authService.usuario.email;
    this.authService.logout();
    swal.fire('Logout', `${username}, has cerrado sesión con éxito!!!`,'success');
    this.router.navigate(['/login']);
  }

}
