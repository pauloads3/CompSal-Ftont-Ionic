import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompsalService } from 'src/app/compsal.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-alterar',
  templateUrl: './alterar.page.html',
  styleUrls: ['./alterar.page.scss'],
})
export class AlterarPage implements OnInit {

  formTime: FormGroup;
  lista_usuariosM = new Array<any>();
  lista_usuariosF = new Array<any>();
  idTime = null;
  usuario: any;


  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private compsalService: CompsalService,
    private alertController: AlertController
  ) {
    this.forms();
    this.carregarDados();

  }

  ngOnInit() {
    this.pegarUsuario();
  }

  forms() {
    this.formTime = this.formBuilder.group({
      id: null,
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

  pegarUsuario() {

    this.idTime = this.activatedRoute.snapshot.paramMap.get('id');
    this.compsalService.detalharTime(this.idTime).subscribe((result: any) => {
      this.usuario = result;
      this.usuario.goleiro = this.usuario.goleiro.toString();
      this.usuario.fixo = this.usuario.fixo.toString();
      this.usuario.alaDireita = this.usuario.alaDireita.toString();
      this.usuario.alaEsquerda = this.usuario.alaEsquerda.toString();
      this.usuario.pivo = this.usuario.pivo.toString();
      this.usuario.treinador = this.usuario.treinador.toString();
      this.usuario.massagista = this.usuario.massagista.toString();
      if (this.usuario.jogadorReserva1 != null) {
        this.usuario.jogadorReserva1 = this.usuario.jogadorReserva1.toString();
      } else {
        this.usuario.jogadorReserva1 = null;
      }
      if (this.usuario.jogadorReserva2 != null) {
        this.usuario.jogadorReserva2 = this.usuario.jogadorReserva2.toString();
      } else {
        this.usuario.jogadorReserva2 = null;
      }
      if (this.usuario.jogadorReserva3 != null) {
        this.usuario.jogadorReserva3 = this.usuario.jogadorReserva3.toString();
      } else {
        this.usuario.jogadorReserva3 = null;
      }
      if (this.usuario.jogadorReserva4 != null) {
        this.usuario.jogadorReserva4 = this.usuario.jogadorReserva4.toString();
      } else {
        this.usuario.jogadorReserva4 = null;
      }
      if (this.usuario.jogadorReserva5 != null) {
        this.usuario.jogadorReserva5 = this.usuario.jogadorReserva5.toString();
      } else {
        this.usuario.jogadorReserva5 = null;
      }
      this.formTime.setValue(this.usuario);
    });


  }

  carregarDados() {
    this.compsalService.getUsuariosMasculino().subscribe(
      data => {
        const respon = (data as any);
        const obj_retor = respon;// = JSON.parse(respon._body);
        this.lista_usuariosM = obj_retor;
        console.log(obj_retor);
        console.log("this.formTime.value.goleiro=" + this.formTime.value.goleiro);
      }, error => {
        this.Alerta(error.message);
        console.log(error);
      }
    );
    this.compsalService.getUsuariosFeminino().subscribe(
      data => {
        const respon = (data as any);
        const obj_retor = respon;// = JSON.parse(respon._body);
        this.lista_usuariosF = obj_retor;
        console.log(obj_retor);
        console.log("this.formTime.value.goleiro=" + this.formTime.value.goleiro);
      }, error => {
        this.Alerta(error.message);
        console.log(error);
      }
    );
  }
  criarTime() {
    let mensagens = "";
    let pessoas: Array<number> = new Array<number>();
    pessoas[0] = this.formTime.value.goleiro;
    pessoas[1] = this.formTime.value.fixo;
    pessoas[2] = this.formTime.value.alaDireita;
    pessoas[3] = this.formTime.value.alaEsquerda;
    pessoas[4] = this.formTime.value.pivo;
    pessoas[5] = this.formTime.value.treinador;
    pessoas[6] = this.formTime.value.massagista;
    pessoas[7] = this.formTime.value.jogadorReserva1;
    pessoas[8] = this.formTime.value.jogadorReserva2;
    pessoas[9] = this.formTime.value.jogadorReserva3;
    pessoas[10] = this.formTime.value.jogadorReserva4;
    pessoas[11] = this.formTime.value.jogadorReserva5;


    let pessoaOk: Boolean;
    pessoaOk = true;
    for (let i = 0; i < 12 && pessoaOk; i++) {
      for (let j = 0; j < 12; j++) {
        if (i != j) {
          if (pessoas[i] == pessoas[j] && pessoas[i] != null) {
            console.log("Pessoa duplicada. i=" + i + "-Id=" + pessoas[i] + ", j=" + j + "-Id=" + pessoas[j]);
            pessoaOk = false;
            mensagens += pessoas[i];
            break;
          }
        }
      }
    }
    if (!pessoaOk) {
      this.Alerta("Existe usuários repitidos!!!<br><br>" + "ID do usuário: " + mensagens);
    } else {
      console.log(this.formTime.value);
      this.compsalService.cadastarTime(this.formTime.value);
    }
  }

  alterarTime() {
    console.log(this.formTime.value);
    let mensagens = "";
    let pessoas: Array<number> = new Array<number>();
    pessoas[0] = this.formTime.value.goleiro;
    pessoas[1] = this.formTime.value.fixo;
    pessoas[2] = this.formTime.value.alaDireita;
    pessoas[3] = this.formTime.value.alaEsquerda;
    pessoas[4] = this.formTime.value.pivo;
    pessoas[5] = this.formTime.value.treinador;
    pessoas[6] = this.formTime.value.massagista;
    pessoas[7] = this.formTime.value.jogadorReserva1;
    pessoas[8] = this.formTime.value.jogadorReserva2;
    pessoas[9] = this.formTime.value.jogadorReserva3;
    pessoas[10] = this.formTime.value.jogadorReserva4;
    pessoas[11] = this.formTime.value.jogadorReserva5;


    let pessoaOk: Boolean;
    pessoaOk = true;
    for (let i = 0; i < 12 && pessoaOk; i++) {
      for (let j = 0; j < 12; j++) {
        if (i != j) {
          if (pessoas[i] == pessoas[j] && pessoas[i] != null) {
            console.log("Pessoa duplicada. i=" + i + "-Id=" + pessoas[i] + ", j=" + j + "-Id=" + pessoas[j]);
            pessoaOk = false;
            mensagens += pessoas[i];
            break;
          }
        }
      }
    }
    if (!pessoaOk) {
      this.compsalService.detalharUsuario(mensagens).subscribe((result: any) => {
        console.log(result);
        this.Alerta("Existe usuários repitidos!!!<br><br>" 
        + "ID: " + result.id 
        + "<br>CPF: " + result.cpf
        + "<br>Nome : " + result.nome);
      });
    } else {
      console.log(this.formTime.value);
      this.compsalService.alterarTime(this.formTime.value);      
    }
  }






  async Alerta(messagem: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: messagem,
      buttons: ['OK']
    });

    await alert.present();
  }
}
