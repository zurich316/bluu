import { Component, OnInit,  } from '@angular/core';
import { FormGroup, FormControl, Validators,FormArray, FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MouseEvent } from '@agm/core';
import Swal from 'sweetalert2';

import { SchoolsService, SchoolID } from "../../../services/schools.service";
import { School } from "../../../model/school"
import { categories, sub_categories, socialList, dayList } from 'src/app/config/school.categories';
import { CustomValidators } from 'src/app/class/custom-validators';

@Component({
  selector: 'app-school-new',
  templateUrl: './school-new.component.html',
  styles: [`
      agm-map {height: 300px;}
      .image-size {
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 5px;
        width: 200px;
      }
  `]
})
export class SchoolNewComponent implements OnInit {
  newSchool:any;
  schoolForm:FormGroup;
  id:string

  categories:any= categories;
  sub_category:any = [];
  
  daysList:string[]=dayList;
  socialLst:string[]= socialList;

  coords:any={lng: -66.157990, lat: -17.385018} ;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              public router: Router,
              public _schoolService:SchoolsService) { 
  }

  ngOnInit() { 
    this.getPosition().then((resp:any)=>{
      console.log(resp)
      this.coords = resp;
    });

    this.defineForm();

    this.id = this.route.snapshot.paramMap.get('id');

    if( this.id !== 'nuevo'){
      this.initEditForm(this.id);
    }else{
      this.initNewForm();
    }
  }
  
  sendSchool(){
    if(!this.schoolForm.valid){
      Swal.fire({
        type:'error',
        title:'Error',
        text: "Formulario no completo"
      });
      return;
    }
    let schoolValue:School = this.schoolForm.value;
    const id = this.route.snapshot.paramMap.get('id');
    if( id !== 'nuevo'){
      console.log("send up")
      this._schoolService.updateSchool(schoolValue);
    }else{
      console.log("send create")
      this._schoolService.createSchool(schoolValue);
    }

   
   
    console.log(this.schoolForm);
  }

  get coach() {
    return this.schoolForm.get('coach');
  }
  get name() {
    return this.schoolForm.get('name');
  }
  get category() {
    return this.schoolForm.get('category');
  }
  get sub_cat() {
    return this.schoolForm.get('sub_cat');
  }

  get tags() {
    return this.schoolForm.get('tags') as FormArray;
  }
  get bodies() {
    return this.schoolForm.get('bodies') as FormArray;
  }
  get phrases() {
    return this.schoolForm.get('phrases') as FormArray;
  }
  get pay() {
    return this.schoolForm.get('pay') as FormArray;
  }
  get sche() {
    return this.schoolForm.get('sche') as FormArray;
  }
  get social() {
    return this.schoolForm.get('social') as FormArray;
  }
  get dir() {
    return this.schoolForm.get('dir') as FormArray;
  }
  get helps() {
    return this.schoolForm.get('helps') as FormArray;
  }

  get img() {
    return this.schoolForm.get('img') as FormControl;
  }

  selectSub(){
    if(!this.category){
      return;
    }
    this.sub_category = sub_categories[this.category.value];
  }

  addTag(cant=1) {
    for (let index = 0; index < cant; index++) {
      const tag = this.formBuilder.control(null,Validators.required);
      this.tags.push(tag);
    }
  }

  addBody(cant=1) {
    for (let index = 0; index < cant; index++) {  
      const body = this.formBuilder.control(null,Validators.required);
      this.bodies.push(body);
    }
  }

  addPhrases(cant=1) {
    for (let index = 0; index < cant; index++) {  
      const phrases = this.formBuilder.group({
        body:['',Validators.required],
        auth:['',Validators.required]
      })
      this.phrases.push(phrases);
    }
  }

  addPay(cant=1) {
    for (let index = 0; index < cant; index++) {  
      const pay = this.formBuilder.group({
        cost:['',[
          Validators.required,
          Validators.min(0),
          Validators.max(1000)
        ]],
        body:['',Validators.required]
      })
      this.pay.push(pay);
    }
  }

  addSchedule(cant=1) {

    const daysCount = this.daysList.length;
    const days = new Array(daysCount).fill(false);
    for (let index = 0; index < cant; index++) {
      const schedule = this.formBuilder.group({
        start:['',Validators.required],
        end:['',Validators.required],
        days:this.formBuilder.array(days,CustomValidators.verifyDaysCheck()),
        note:['']
      })
      

      this.sche.push(schedule);
    }
  }
  
  addDirecction($event: MouseEvent) {

    let coordenadas = {
      lat: $event.coords.lat,
      lng: $event.coords.lng,
    };

    const dir = this.formBuilder.group({
      coor:[coordenadas,Validators.required],
      body:['',Validators.required]
    })
    this.dir.push(dir);

  }

  addDir(cant=1){
    for (let index = 0; index < cant; index++) {  
      const dir = this.formBuilder.group({
        coor:this.formBuilder.group({
          lat:null,
          lng:null
        }),
        body:['',Validators.required]
      })
      this.dir.push(dir);
    }
  }

  //Ayudantes

  addHelps(cant=1) { 
    for (let index = 0; index < cant; index++) {  
      const help = this.formBuilder.group({
        name:['',Validators.required],
        num:['',Validators.required]
      })
      this.helps.push(help);
    }
  }

  addSocial(cant=1) { 
    for (let index = 0; index < cant; index++) { 
      const social = this.formBuilder.group({
        type:[null,Validators.required],
        body:['',Validators.required]
      })
      this.social.push(social);
    }
  }

  removeItem(index:any,type:FormArray){
    type.removeAt(index);
  }
  
  
  defineForm(){

    let coachData = this.formBuilder.group({
      name:['',Validators.required],
      email:['',[Validators.required, Validators.email]],
      phone:['',Validators.required],  
    })

    this.schoolForm = this.formBuilder.group({
      name:['',Validators.required],
      category:[null,Validators.required],
      sub_cat:[null,Validators.required],
      coach: coachData,
      
      tags: this.formBuilder.array([]),
      bodies: this.formBuilder.array([]),
      phrases: this.formBuilder.array([]),
      pay: this.formBuilder.array([]),
      sche: this.formBuilder.array([]),
      dir: this.formBuilder.array([],[Validators.required]),
      helps: this.formBuilder.array([]),
      social: this.formBuilder.array([]),

      active:false,
      block:false,
      img:"assets/imgs/default.jpg",
      createAt:new Date(),
      updateAt:null,
      revs:[]
    });
  }

  getPosition(): Promise<any>
  {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {

          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
          console.error("Geolocalitation fail");
          reject(null)
        });
    });

  }

  initEditForm(id:string){
    this._schoolService.getSchoolInfo(id).then((resp:School)=>{
      if(!resp){
        this.router.navigate(['escuelas/nuevo']);
        return
      }
      console.log("init edit")
      this.addTag(resp.tags.length)
      this.addBody(resp.bodies.length)
      this.addPhrases(resp.phrases.length)
      this.addPay(resp.pay.length)
      this.addSchedule(resp.sche.length)
      this.addDir(resp.dir.length)
      this.addHelps(resp.helps.length)
      this.addSocial(resp.social.length)      
      
      this.schoolForm.patchValue(resp);
      this.selectSub();
    });

  }

  initNewForm(){
    this.addTag();
    this.addBody();
    this.addSchedule();
    this.addPay();
  }

  changePhoto($event){

    if ($event.target.files.length === 0){
      Swal.fire({
        type:'error',
        title:'Error Imagen',
        text: "Solo puedes seleccionar una imagen"
      });
      return;
    }

    let newFile:File = $event.target.files[0];

    if (newFile.type.match(/image\/*/) == null) {
      Swal.fire({
        type:'error',
        title:'Error',
        text: "Archivo tiene que ser imagen"
      });
      return;
    }
    
    let mbSize = parseFloat((newFile.size / 1048576).toFixed(3))
    if (mbSize>2) {
      Swal.fire({
        type:'error',
        title:'Error',
        text: "La imagen no puede ser mayor a 2 mB"
      });
      return;
    }
    

    this._schoolService.updatePhoto($event.target.files[0],{
      id:this.id,
      name:"escuelas/" +this.id + "/titulo",
      url:this.schoolForm.value.img
    }).then((resp:string)=>{
      this.img.setValue(resp)
    });
  }

  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    return (bytes / 1048576).toFixed(3)
  }

  // dend(event){
  //   console.log("End")
  //   console.log(event)
  // }
  // dstart(event){
  //   console.log("start")
  //   console.log(event)
  // }
  // drag(event){
  //   console.log("drag")
  //   console.log(event)
  // }




}
