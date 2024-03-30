import { Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { PlansComponent } from './pages/plans/plans.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { CrudComponent } from './pages/crud/crud.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginGuardian } from './pages/login/login-guardian';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  { path: 'home', component: IndexComponent },
  { path: 'about', component: AboutusComponent },
  { path: 'plans', component: PlansComponent },
  { path: 'crud', component: CrudComponent, canActivate:[LoginGuardian] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PagenotfoundComponent },
];
