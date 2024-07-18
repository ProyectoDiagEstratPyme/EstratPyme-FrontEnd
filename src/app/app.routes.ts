import { Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { RegisterComponent } from './views/register/register.component';
import { HelpUserComponent } from './views/help-user/help-user.component';

export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'register', component: RegisterComponent },
    {path: 'help-user', component: HelpUserComponent}
];

