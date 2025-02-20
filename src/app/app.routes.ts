import { Routes } from '@angular/router';
import { AuthGuard, AuthService } from '@auth0/auth0-angular';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then( m => m.HomePage),
    canActivate: [AuthGuard]
  },
  {
    path: 'cartas',
    loadComponent: () => import('./cartas/cartas.page').then( m => m.CartasPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'peleas',
    loadComponent: () => import('./peleas/peleas.page').then( m => m.PeleasPage)
  },
  {
    path: 'tienda',
    loadComponent: () => import('./tienda/tienda.page').then( m => m.TiendaPage)
  },
];
