import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';

//Datepicker
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from "@angular/material-moment-adapter";
import { MatNativeDateModule, 
         DateAdapter, 
         MAT_DATE_FORMATS, 
         MAT_DATE_LOCALE  } from '@angular/material/core';


@NgModule({
  imports: [MatButtonModule, 
            MatCheckboxModule,
            MatFormFieldModule,
            MatSelectModule,
            MatInputModule,
            MatCardModule,
            MatDatepickerModule,
            MatNativeDateModule ,
            MatRadioModule],
            
  exports: [MatButtonModule, 
            MatCheckboxModule,
            MatFormFieldModule,
            MatSelectModule,
            MatInputModule,
            MatCardModule,
            MatDatepickerModule,
            MatNativeDateModule ,
            MatRadioModule],
})
export class MaterialModule { }



export const providerMaterials = [
  {provide: MAT_DATE_LOCALE, useValue: 'en-Es'},
  {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
  {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  MatDatepickerModule
]