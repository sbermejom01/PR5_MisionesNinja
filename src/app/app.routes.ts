import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MisionDetalleComponent } from './mision-detalle/mision-detalle.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'home', component: HomeComponent },
  { path: 'mision-detalle/:id', component: MisionDetalleComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];