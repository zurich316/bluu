import { Routes, RouterModule } from '@angular/router';
import { SchoolHomeComponent } from './school-home/school-home.component';
import { SchoolViewComponent } from './school-view/school-view.component';
import { SchoolSubcategoryComponent } from './school-subcategory/school-subcategory.component';
import { SchoolCategoryComponent } from './school-category/school-category.component';
import { SchoolComponent } from './school.component';

const pagesRoutes: Routes = [
  {
    path:"",
    component:SchoolComponent,
    children:[
        {path: '', component: SchoolHomeComponent },
        {path: ':category', component: SchoolCategoryComponent },
        {path: ':category/:subcategory', component: SchoolSubcategoryComponent },
        {path: ':category/:subcategory/:id', component: SchoolViewComponent },
        {path: '', pathMatch: 'full', redirectTo:'escuelas'}
    ]
  }
];

export const Schools_ROUTER = RouterModule.forChild( pagesRoutes);