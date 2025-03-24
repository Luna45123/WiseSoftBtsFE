import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UpdateTableComponent } from './update-table/update-table.component';
import { BtsMapComponent } from './bts-map/bts-map.component';
import { LoginComponent } from './login/login.component';
import { AdminGuard } from './guards/admin.guard';
import { SingupComponent } from './singup/singup.component';

export const routes: Routes = [
    { path: '', component: BtsMapComponent }, // Default Route
    { path: 'home', component: BtsMapComponent }, // Home Page
    { path: 'admin', component: UpdateTableComponent ,canActivate: [AdminGuard] }, // Admin Page
    { path: 'login',component:LoginComponent},
    { path: 'singup',component:SingupComponent},
    { path: '**', redirectTo: '' } // Wildcard Route (Redirect to Home)
  ];
