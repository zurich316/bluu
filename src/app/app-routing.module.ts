import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SchoolIndexComponent } from './pages/schools/school-index/school-index.component';
import { SchoolViewComponent } from './pages/schools/school-view/school-view.component';
import { SchoolEditComponent } from './pages/schools/school-edit/school-edit.component';
import { SchoolNewComponent } from './pages/schools/school-new/school-new.component';




const routes: Routes = [
  {path: 'escuelas', component: HomeComponent },
  {path: 'escuelas/nuevo', component: SchoolNewComponent },
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
