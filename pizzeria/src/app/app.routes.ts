import { Routes } from '@angular/router';
import { Capturas } from './pizzeria/capturas/capturas';
import { Detalles } from './pizzeria/detalles/detalles';
import { Ventas } from './pizzeria/ventas/ventas'; 

export const routes: Routes = [
  { path: '', redirectTo: 'captura', pathMatch: 'full' },
  { path: 'captura', component: Capturas },
  { path: 'detalles', component: Detalles },
  { path: 'ventas', component: Ventas }
];