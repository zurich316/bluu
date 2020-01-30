// Header y Home
import { SchoolHomeComponent } from './pages/schools/school-home/school-home.component';
import { LoginComponent } from './pages/login/login.component';
import { InformationComponent } from './pages/information/information.component';

//Auth
import { AccountsIndexComponent } from './pages/auth/accounts-index/accounts-index.component';
import { AccountsNewComponent } from './pages/auth/accounts-new/accounts-new.component';

// Schools
import { SchoolCategoryComponent } from './pages/schools/school-category/school-category.component';
import { SchoolCardComponent } from './pages/schools/school-card/school-card.component';
import { SchoolViewComponent } from './pages/schools/school-view/school-view.component';
import { SchoolNewComponent } from './pages/schools/school-new/school-new.component';
import { SchoolComponent } from './pages/schools/school.component';
import { SchoolSubcategoryComponent } from './pages/schools/school-subcategory/school-subcategory.component';
import { SchoolsControlComponent } from './pages/auth/schools-control/schools-control.component';

//Components
import { PagesComponent } from './pages/pages.component';
import { MapsModuleComponent } from './components/maps-module/maps-module.component';
import { SendMessagesComponent } from './components/send-messages/send-messages.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoadingComponent } from './components/loading/loading.component';
import { SignInComponent } from './pages/login/sign-in.component';
import { PurchaseComponent } from './components/modals/purchase/purchase.component';
import { PurchaseDoneComponent } from './components/modals/purchase-done/purchase-done.component';
import { RememberPasswordComponent } from './pages/login/remember-password.component';
import { AuthComponent } from './pages/auth/auth.component';

// Imports
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";

//Maps
import { AgmCoreModule } from '@agm/core';

//Firebase
import { AngularFireModule } from '@angular/fire';
import { firebaseConfig } from './config/firebase.config'
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';

export const APP_ROUTES_SCHOOLS = [
    SchoolCategoryComponent,
    SchoolCardComponent,
    SchoolViewComponent,
    SchoolNewComponent,
    SchoolComponent,
    SchoolSubcategoryComponent,
    SchoolsControlComponent,
];

export const APP_MODULE_DECLARATIONS = [   
    SchoolHomeComponent,
    LoginComponent,
    AccountsIndexComponent,
    AccountsNewComponent,
    InformationComponent,
    PagesComponent,
    SignInComponent,
    PurchaseComponent,
    PurchaseDoneComponent,
    RememberPasswordComponent,
    AuthComponent,
];

export const APP_ROUTES_COMPONENTS = [
    MapsModuleComponent,
    HeaderComponent,
    FooterComponent,
    SendMessagesComponent,
    LoadingComponent,
];

export const APP_MODULE_IMPORTS = [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
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