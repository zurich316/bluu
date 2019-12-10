import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolComponent } from './school.component';
import { Schools_ROUTER } from "./school.routes";
import { SharedModule } from 'src/app/shared/shared.module';

// Imports
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";

//Maps
import { AgmCoreModule } from '@agm/core';

//Firebase
import { AngularFireModule } from '@angular/fire';
import { firebaseConfig } from './../../config/firebase.config'
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from "@angular/fire/auth";

@NgModule({
  declarations: [


  ],
  imports: [
    SharedModule
    
  ],
  exports:[

  ]
})
export class SchoolModule { }
