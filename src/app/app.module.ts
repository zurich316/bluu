import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './_nav/header/header.component';
import { HomeComponent } from './pages/home/home.component';
//Firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';

//Maps
import { AgmCoreModule } from '@agm/core';
import { SchoolIndexComponent } from './pages/school-index/school-index.component';
import { CategoryCardComponent } from './pages/category-card/category-card.component';
import { AboutComponent } from './pages/about/about.component';
import { SchoolCardComponent } from './pages/school-card/school-card.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SchoolIndexComponent,
    CategoryCardComponent,
    AboutComponent,
    SchoolCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA-HXVa2jtkGfKtIJwisxgC46RaWqC1xuI'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
