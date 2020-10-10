import {RouterModule, Routes} from '@angular/router';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { RolesComponent } from './components/roles/roles.component';
import { HomeComponent } from './components/home/home.component';

const APP_ROUTES: Routes = [
    {path: 'usuarios', component: UsuariosComponent },
    {path: 'roles', component: RolesComponent},
    {path: 'home', component: HomeComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

export const APPROUTING = RouterModule.forRoot(APP_ROUTES, {useHash: true});