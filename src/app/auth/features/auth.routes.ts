
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
// import { SignUpComponent } from './features/sign-up/sign-up.component';

export const authRoutes: Routes = [
  { path: 'login', component: LoginComponent },
//   { path: 'sign-up', component: SignUpComponent },
];
