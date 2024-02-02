import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminSignupComponent } from './admin-signup/admin-signup.component';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
    { path: '', component: SignupComponent },
    { path: 'register', redirectTo: '', pathMatch: 'full' },
    { path: 'adminregister', component: AdminSignupComponent },
    { path: 'adminlogin', component: SigninComponent },
    {
        path: 'dashboard', children: [
            { path: '', component: DashboardComponent }
        ], canActivate:[adminGuard]
    },
];
