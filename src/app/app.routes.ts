import {RouterModule, Routes} from '@angular/router';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { RolesComponent } from './components/roles/roles.component';
import { HomeComponent } from './components/home/home.component';
import { FormularioUsuarioComponent } from './components/usuarios/formulario-usuario.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './components/usuarios/guards/auth.guard';

const APP_ROUTES: Routes = [
    {path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard] },
    {path: 'usuarios/form', component: FormularioUsuarioComponent, canActivate: [AuthGuard]},
    {path: 'usuarios/form/:id', component: FormularioUsuarioComponent, canActivate: [AuthGuard]},
    {path: 'roles', component: RolesComponent, canActivate: [AuthGuard]},
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

export const APPROUTING = RouterModule.forRoot(APP_ROUTES, {useHash: true});