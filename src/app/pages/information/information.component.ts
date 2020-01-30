import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  usuario = {
    name: '',
    email: ''
  };

  constructor(private _subsService: SubscriptionService) {
   }

  ngOnInit() {
  }

  createSubscription(usuarioForm: NgForm) {
    if (!usuarioForm.valid) {
      Swal.fire({
        type: 'error',
        title: 'Error',
        text: 'Verifique correo electronico y el nombre debe tener al menos 4 caracteres'
      });
      return;
    }

    if (this.blockButton()) {
      console.log('bloqueado');
      return; }

    // this._subsService.sendEmail(this.usuario).subscribe((resp)=>{
    //   console.log(resp);
    // });
    this._subsService.createSubscription(this.usuario);
    usuarioForm.reset();
  }

  blockButton() {
    const token = localStorage.getItem('expira');
    const dia = new Date();
    const diferemceMin = Math.round(((Number(token) - dia.getTime() % 86400000) % 3600000) / 60000);

    if (diferemceMin > 0) {
      Swal.fire({
        type: 'error',
        title: 'Error',
        text: `Tiene que esperar ${diferemceMin} minutos para enviar otro usuario`
      });
      console.log('trues');
      return true;
    } else {
      console.log('falses');
      return false;
    }



  }

}
