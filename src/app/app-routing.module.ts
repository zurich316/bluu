import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Guards
import { LoggedUserGuard } from './guard/loggedUser.guard';
import { RolesGuard } from './guard/roles.guard';
import { NoLoginAuthGuard } from './guard/noLogin.guard';

import { PagesComponent } from './pages/pages.component';
import { AuthComponent } from './pages/auth/auth.component';
import { LoginComponent } from './pages/login/login.component';
import { SignInComponent } from './pages/login/sign-in.component';
import { AccountsIndexComponent } from './pages/auth/accounts-index/accounts-index.component';
import { AccountsNewComponent } from './pages/auth/accounts-new/accounts-new.component';
import { InformationComponent } from './pages/information/information.component';
import { RememberPasswordComponent } from './pages/login/remember-password.component';

import { SchoolHomeComponent } from './pages/schools/school-home/school-home.component';
import { SchoolViewComponent } from './pages/schools/school-view/school-view.component';
import { SchoolNewComponent } from './pages/schools/school-new/school-new.component';
import { SchoolsControlComponent } from './pages/auth/schools-control/schools-control.component';
import { SchoolSubcategoryComponent } from './pages/schools/school-subcategory/school-subcategory.component';
import { SchoolCategoryComponent } from './pages/schools/school-category/school-category.component';

const routes: Routes = [
  {path: 'proximamente', component: InformationComponent,canActivate:[NoLoginAuthGuard] },
  {path: 'login', component: LoginComponent,canActivate:[NoLoginAuthGuard] },
  {path: 'sign-in', component: SignInComponent,canActivate:[NoLoginAuthGuard] },
  {path: 'recordar', component: RememberPasswordComponent,canActivate:[NoLoginAuthGuard] },
  {
    path:'escuelas', 
    component:PagesComponent,
    children:[
      {path: '', component: SchoolHomeComponent },
      {path: ':category', component: SchoolCategoryComponent },
      {path: ':category/:subcategory', component: SchoolSubcategoryComponent },
      {path: ':category/:subcategory/:id', component: SchoolViewComponent },
      {path: '', pathMatch: 'full', redirectTo:'escuelas'}
    ],
    canActivate:[LoggedUserGuard,RolesGuard],
    data: { 
      expectedRole: 'estudiante'
    } 
  },
  {
    path:'admin', 
    component:AuthComponent,
    children:[
      {path: 'cuentas', component: AccountsIndexComponent },
      {path: 'cuentas/nuevo', component: AccountsNewComponent },
      {path: 'escuelas', component: SchoolsControlComponent },
      {path: 'escuelas/:id', component: SchoolNewComponent },
      {path: 'escuelas/:id/ver', component: SchoolViewComponent },
      {path: '', pathMatch:'full', redirectTo:'cuentas'}
    ],
    canActivate:[LoggedUserGuard,RolesGuard],
    data: { 
      expectedRole: 'admin'
    } 
  },
  
  {path: '**', pathMatch: 'full', redirectTo:'proximamente'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
