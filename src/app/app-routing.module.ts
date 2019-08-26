import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

import { HomeComponent } from './pages/home/home.component';
import { SchoolIndexComponent } from './pages/schools/school-index/school-index.component';
import { SchoolViewComponent } from './pages/schools/school-view/school-view.component';
import { SchoolEditComponent } from './pages/schools/school-edit/school-edit.component';
import { SchoolNewComponent } from './pages/schools/school-new/school-new.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { AccountsIndexComponent } from './pages/auth/accounts-index/accounts-index.component';
import { AccountsNewComponent } from './pages/auth/accounts-new/accounts-new.component';
import { InformationComponent } from './shared/information/information.component';

const routes: Routes = [
  //{path: 'proximamente', component: InformationComponent},
  {path: 'login', component: LoginComponent },
  {path: 'cuentas', component: AccountsIndexComponent },
  {path: 'cuentas/nuevo', component: AccountsNewComponent },
  {path: 'escuelas', component: HomeComponent },
  {path: 'escuelas/nuevo', component: SchoolNewComponent,canActivate:[AuthGuard]  },
  {path: 'escuelas/disciplina/:name', component: SchoolIndexComponent },
  {path: 'escuelas/disciplina/:name/detalles/:id', component: SchoolViewComponent },
  {path: 'escuelas/disciplina/:name/detalles/:id/editar', component: SchoolEditComponent},
  {path: '**', pathMatch: 'full', redirectTo:'escuelas'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
