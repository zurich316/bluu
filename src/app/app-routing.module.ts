import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SchoolIndexComponent } from './pages/school-index/school-index.component';



const routes: Routes = [
  {path: 'home', component: HomeComponent },
  {path: 'escuela/:name', component: SchoolIndexComponent },
  {path: '**', pathMatch: 'full', redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
