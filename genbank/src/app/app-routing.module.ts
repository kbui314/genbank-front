import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainpageComponent } from './mainpage/mainpage.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  // {path: 'login', component: LoginComponent},
  {path: 'login', redirectTo: '/', pathMatch: 'full'},
  {path: 'register', component: RegisterComponent},
  {path: 'view', component: MainpageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
