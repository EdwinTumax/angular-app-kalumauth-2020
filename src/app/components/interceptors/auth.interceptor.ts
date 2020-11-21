import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { catchError } from 'rxjs/operators';
import swal from 'sweetalert2';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    constructor(private router:Router, private authService: AuthService){}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError( e => {
                if(e.status === 401){
                    if(this.authService.isAuthenticated()){
                        this.authService.logout();
                    }
                    this.router.navigate(['/login']);
                }
                if(e.status === 403){
                    swal.fire('Acceso denegado', `${this.authService.usuario.email} no tiene acceso al recurso`,'warning');
                    this.router.navigate(['/home']);
                }
                return throwError(e);
            })
        );
    }

}
