import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-send-messages',
  templateUrl: './send-messages.component.html',
  styles: []
})
export class SendMessagesComponent implements OnInit {

  formMensaje: FormGroup;
  constructor(private toastr: ToastrService) {
    this.defineForm();
  }

  ngOnInit() {
  }

  defineForm() {
    this.formMensaje = new FormGroup({
      'nombre' : new FormControl('', [
        Validators.required,
        Validators.minLength(10)
      ]),
      'email': new FormControl('', [
        Validators.email,
        Validators.required
      ]),
      'mensaje' : new FormControl('', [
          Validators.required,
          Validators.minLength(10)
      ])
    });
  }

  enviarFormulario() {
    console.log(this.formMensaje);
    this.toastr.success('Correo enviado');
    this.formMensaje.reset();
  }
}
