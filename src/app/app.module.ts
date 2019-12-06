import { NgModule, LOCALE_ID } from '@angular/core';
import { AppComponent } from './app.component';

// Lenguaje
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs)

import { APP_ROUTES_SCHOOLS, 
         APP_MODULE_DECLARATIONS, 
         APP_ROUTES_COMPONENTS, 
         APP_MODULE_IMPORTS } from './app.module.dependecies';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Materials module
import { MaterialModule, providerMaterials } from './materials.module';
import { SchoolComponent } from './pages/schools/school.component';
import { SchoolsControlComponent } from './pages/auth/schools-control/schools-control.component';
import { AuthComponent } from './pages/auth/auth.component';
import { RememberPasswordComponent } from './pages/login/remember-password.component';
import { SchoolSubcategoryComponent } from './pages/schools/school-subcategory/school-subcategory.component';
import { SchoolCategoryComponent } from './pages/schools/school-category/school-category.component';

@NgModule({
  declarations: [
    AppComponent,
    APP_ROUTES_SCHOOLS,
    APP_MODULE_DECLARATIONS,
    APP_ROUTES_COMPONENTS,
    SchoolComponent,
    SchoolsControlComponent,
    AuthComponent,
    RememberPasswordComponent,
    SchoolSubcategoryComponent,
    SchoolCategoryComponent,
  ],
  imports: [
    APP_MODULE_IMPORTS,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [  
    { provide: LOCALE_ID, useValue:'es-Es' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
