import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about/about.component';

import { from } from 'rxjs';
import { CanActivateGuardService } from './can-activate-guard.service';
import { LoginComponent } from './login/login.component';
import { WidgetscreensComponent } from './widgetscreens/widgetscreens.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'widget', component: WidgetscreensComponent },
 
  { path: 'kvb', component: AboutComponent, canActivate:[CanActivateGuardService] },

  { path: '', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
