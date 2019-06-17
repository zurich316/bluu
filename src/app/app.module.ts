import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Lenguaje
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs)

//Maps
import { AgmCoreModule } from '@agm/core';

//Firebase
import { AngularFireModule } from '@angular/fire';
import { firebaseConfig } from './config/firebase.config'
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

// Header y Home
import { HeaderComponent } from './_nav/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { LoadingComponent } from './pages/loading/loading.component';
// Schools
import { SchoolIndexComponent } from './pages/schools/school-index/school-index.component';
import { SchoolCardComponent } from './pages/schools/school-card/school-card.component';
import { SchoolViewComponent } from './pages/schools/school-view/school-view.component';
import { SchoolNewComponent } from './pages/schools/school-new/school-new.component';
import { SchoolFormComponent } from './pages/schools/school-form/school-form.component';
import { SchoolEditComponent } from './pages/schools/school-edit/school-edit.component';
import { SchoolModalReviewComponent } from './pages/schools/school-modal-review/school-modal-review.component';
import { MapsModuleComponent } from './components/maps-module/maps-module.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SchoolIndexComponent,
    AboutComponent,
    SchoolCardComponent,
    SchoolViewComponent,
    SchoolNewComponent,
    SchoolFormComponent,
    SchoolEditComponent,
    LoadingComponent,
    SchoolModalReviewComponent,
    MapsModuleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireStorageModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD4aBvDar3-MR2o1Ywjx8hWM5w7H3Dmh9c'
    })
  ],
  providers: [ { provide: LOCALE_ID, useValue:'es-Es' } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
