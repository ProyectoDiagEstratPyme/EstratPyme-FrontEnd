import { Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { RegisterComponent } from './views/register/register.component';
import { HelpUserComponent } from './views/help-user/help-user.component';
import { LoginComponent } from './views/login/login.component';
import { LandingPageComponent } from './views/landing-page/landing-page.component';
import { CanActivateUser } from './guards/auth.guard';
import { SettingComponent } from './components/setting/setting.component';


export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [CanActivateUser] },
    { path: 'register', component: RegisterComponent },
    {path: 'help-user', component: HelpUserComponent},
    {path: 'login', component: LoginComponent},
    {path: 'landing-page', component: LandingPageComponent},
    { path: 'setting', component: SettingComponent },
    
    {
        path: '',
        redirectTo: 'landing-page',
        pathMatch: 'full'
    }
];

