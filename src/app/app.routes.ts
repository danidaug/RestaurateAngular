
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { Admin } from './admin/admin';
import { Menu } from './menu/menu';
import { Login } from './login/login';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {path : 'home', component: Home},
  {path : 'admin', component: Admin},
  {path : 'menu', component: Menu},
  { path: 'login', component: Login },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  exports: [RouterModule]
})
export class AppRoutingModule { }
