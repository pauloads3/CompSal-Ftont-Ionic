import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompsalService } from 'src/app/compsal.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-alterar',
  templateUrl: './alterar.page.html',
  styleUrls: ['./alterar.page.scss'],
})
export class AlterarPage implements OnInit {

  formTime: FormGroup;
  lista_usuariosM = new Array<any>();
  lista_usuariosF = new Array<any>();

  constructor(
    private formBuilder: FormBuilder,
    private compsalService: CompsalService,
    private alertController: AlertController
    ) {
      this.forms();

     }

  ngOnInit() {
  }
  forms() {
    this.formTime = this.formBuilder.group({
      id:null,     
      nome: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      genero: [null, [Validators.required]],
      goleiro: [null, [Validators.required]],
      fixo: [null, [Validators.required]],
      alaDireita: [null, [Validators.required]],
      alaEsquerda: [null, [Validators.required]],
      pivo: [null, [Validators.required]],
      treinador: [null, [Validators.required]],
      massagista: [null, [Validators.required]],
      jogadorReserva1: null,
      jogadorReserva2: null,
      jogadorReserva3: null,
      jogadorReserva4: null,
      jogadorReserva5: null
    });
  }
  

}
