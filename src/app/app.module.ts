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
import { MaterialModule } from './materials.module';
import { SchoolModule } from './pages/schools/school.module';

@NgModule({
  declarations: [
    AppComponent,
    APP_ROUTES_SCHOOLS,
    APP_MODULE_DECLARATIONS,
    APP_ROUTES_COMPONENTS,
  ],
  imports: [
    APP_MODULE_IMPORTS,
    BrowserAnimationsModule,
    MaterialModule,
    SchoolModule
  ],
  providers: [  
    { provide: LOCALE_ID, useValue:'es-Es' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
