import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Guards
import { AuthGuard } from './guard/auth.guard';
import { LogginAuthGuard } from './guard/loggin-auth.guard';

import { HomeComponent } from './pages/home/home.component';
import { SchoolIndexComponent } from './pages/schools/school-index/school-index.component';
import { SchoolViewComponent } from './pages/schools/school-view/school-view.component';
import { SchoolEditComponent } from './pages/schools/school-edit/school-edit.component';
import { SchoolNewComponent } from './pages/schools/school-new/school-new.component';
import { LoginComponent } from './pages/login/login.component';
import { SignInComponent } from './pages/login/sign-in.component';
import { AccountsIndexComponent } from './pages/auth/accounts-index/accounts-index.component';
import { AccountsNewComponent } from './pages/auth/accounts-new/accounts-new.component';
import { InformationComponent } from './pages/information/information.component';
import { SchoolHomeComponent } from './pages/schools/school-home.component';
import { PagesComponent } from './pages/pages.component';
import { AuthComponent } from './pages/auth/auth.component';
import { SchoolsControlComponent } from './pages/auth/schools-control/schools-control.component';

const routes: Routes = [
  {path: 'proximamente', component: InformationComponent, canActivate:[LogginAuthGuard]},
  {path: 'login', component: LoginComponent,canActivate:[LogginAuthGuard] },
  //{path: 'sign-in', component: SignInComponent },
  // {
  //   path:'escuelas', 
  //   component:PagesComponent,
  //   children:[
  //     {path: '', component: HomeComponent },
  //     {path: ':id', component: SchoolNewComponent  },
  //     {path: 'disciplina/:name', component: SchoolIndexComponent },
  //     {path: 'disciplina/:name/detalles/:id', component: SchoolViewComponent },
  //     {path: 'disciplina/:name/detalles/:id/editar', component: SchoolEditComponent},
  //     {path: '', pathMatch: 'full', redirectTo:'escuelas'}
  //   ]
  // },
  {
    path:'admin', 
    component:AuthComponent,
    children:[
      {path: 'cuentas', component: AccountsIndexComponent,canActivate:[AuthGuard] },
      {path: 'cuentas/nuevo', component: AccountsNewComponent,canActivate:[AuthGuard] },
      {path: 'escuelas', component: SchoolsControlComponent,canActivate:[AuthGuard] },
      {path: 'escuelas/:id', component: SchoolNewComponent,canActivate:[AuthGuard] },
      {path: 'escuelas/:id/ver', component: SchoolViewComponent,canActivate:[AuthGuard] },
      {path: '', pathMatch:'full', redirectTo:'cuentas'}
    ]
  },
  
  {path: '**', pathMatch: 'full', redirectTo:'proximamente'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
