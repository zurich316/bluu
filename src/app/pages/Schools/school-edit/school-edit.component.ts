import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SchoolsService } from "../../../services/schools.service";
import { Observable } from 'rxjs';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore  } from '@angular/fire/firestore';


@Component({
  selector: 'app-school-edit',
  templateUrl: './school-edit.component.html',
  styles: []
})
export class SchoolEditComponent implements OnInit {

  schoolID:string;
  categoryName:string;

    // Main task 
    task: AngularFireUploadTask;

    // Progress monitoring
    percentage: Observable<number>;
  
    snapshot: Observable<any>;
  
    // Download URL
    downloadURL: Observable<string>;
  
    // State for dropzone CSS toggling
    isHovering: boolean;

  school:any;
  constructor( private router:ActivatedRoute,
               public _schoolService:SchoolsService,
               private storage: AngularFireStorage, 
               private db: AngularFirestore) { }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }    
  
  
  
  startUpload(event: FileList) {
    // The File object
    const file = event.item(0)

    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') { 
      console.error('unsupported file type :( ')
      return;
    }

    // The storage path
    const path = `test/${new Date().getTime()}_${file.name}`;

    // Totally optional metadata
    const customMetadata = { app: 'My AngularFire-powered PWA!' };

    // The main task
    this.task = this.storage.upload(path, file, { customMetadata })

    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot   = this.task.snapshotChanges()

    // The file's download URL
    const ref = this.storage.ref(path);
    this.downloadURL = ref.getDownloadURL();
  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }     

  ngOnInit() {

    /*
    this.categoryName = this.router.snapshot.params['name']
    this.schoolID = this.router.snapshot.params['id']
    this._schoolService.getSchool(this.categoryName,this.schoolID)
                       .subscribe((data:any)=>{
                         this.school = data;
                         console.log(this.school);
                       });
    */

  }

}
