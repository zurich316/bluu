// Header y Home
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { AboutComponent } from './pages/about/about.component';
//Auth
import { AccountsIndexComponent } from './pages/auth/accounts-index/accounts-index.component';
import { AccountsNewComponent } from './pages/auth/accounts-new/accounts-new.component';

// Schools
import { SchoolIndexComponent } from './pages/schools/school-index/school-index.component';
import { SchoolCardComponent } from './pages/schools/school-card/school-card.component';
import { SchoolViewComponent } from './pages/schools/school-view/school-view.component';
import { SchoolNewComponent } from './pages/schools/school-new/school-new.component';
import { SchoolFormComponent } from './pages/schools/school-form/school-form.component';
import { SchoolEditComponent } from './pages/schools/school-edit/school-edit.component';

//Components
import { SchoolModalReviewComponent } from './pages/schools/school-modal-review/school-modal-review.component';
import { MapsModuleComponent } from './components/maps-module/maps-module.component';
import { SendMessagesComponent } from './components/send-messages/send-messages.component';
import { HeaderComponent } from './_nav/header/header.component';
import { LoadingComponent } from './components/loading/loading.component';

// Imports
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Maps
import { AgmCoreModule } from '@agm/core';

//Firebase
import { AngularFireModule } from '@angular/fire';
import { firebaseConfig } from './config/firebase.config'
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from "@angular/fire/auth";

export const APP_ROUTES_SCHOOLS = [
    SchoolIndexComponent,
    SchoolCardComponent,
    SchoolViewComponent,
    SchoolNewComponent,
    SchoolFormComponent,
    SchoolEditComponent,
    SchoolModalReviewComponent,
];

export const APP_MODULE_DECLARATIONS = [   
    HomeComponent,
    AboutComponent,
    LoginComponent,
    AccountsIndexComponent,
    AccountsNewComponent
];

export const APP_ROUTES_COMPONENTS = [
    MapsModuleComponent,
    HeaderComponent,
    SendMessagesComponent,
    LoadingComponent,
];

export const APP_MODULE_IMPORTS = [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireStorageModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD4aBvDar3-MR2o1Ywjx8hWM5w7H3Dmh9c'
    })
]