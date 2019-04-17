import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SchoolIndexComponent } from './pages/school-index/school-index.component';
import { SchoolViewComponent } from './pages/school-view/school-view.component';
import { SchoolEditComponent } from './pages/school-edit/school-edit.component';
import { SchoolNewComponent } from './pages/school-new/school-new.component';




const routes: Routes = [
  {path: 'escuela', component: HomeComponent },
  {path: 'escuela/nuevo', component: SchoolNewComponent },
  {path: 'escuela/:name', component: SchoolIndexComponent },
  {path: 'escuela/:name/:id', component: SchoolViewComponent },
  {path: 'escuela/:name/:id/editar', component: SchoolEditComponent},
  {path: '**', pathMatch: 'full', redirectTo:'escuela'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
