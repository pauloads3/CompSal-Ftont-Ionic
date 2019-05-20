import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompsalService } from 'src/app/compsal.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {

  formJogo: FormGroup;
  lista_usuariosM = new Array<any>();
  lista_usuariosF = new Array<any>();
  lista_timesM = new Array<any>();
  lista_timesF = new Array<any>();
  usuariosTimeA: any;
  usuariosTimeB: any;
  time: any;

  constructor(
    private formBuilder: FormBuilder,
    private compsalService: CompsalService,
    private router: Router,
    private alertController: AlertController
  ) {
    this.forms();
  }

  ngOnInit() {
    this.carregarDados();
  }

  forms() {
    this.formJogo = this.formBuilder.group({
      id: null,
      genero: [null, [Validators.required]],
      timeA: [null, [Validators.required]],
      timeB: [null, [Validators.required]],
      arbitroPrincipal: [null, [Validators.required]],
      arbitroAuxiliar: [null, [Validators.required]],
      anotador: [null, [Validators.required]],
      dataJogo: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      horario: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      localJogo: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]]
    });
  }
  
  criarJogo() {

    this.compsalService.detalharTime(this.formJogo.value.timeA).subscribe((result: any) => {
      this.time = result;
      console.log(this.usuariosTimeA);
    });
    let mensagens = "";
    let pessoas: Array<number> = new Array<number>();
    console.log(this.time);
    console.log(this.usuariosTimeB);

    pessoas[0] = this.formJogo.value.arbitroPrincipal;
    pessoas[1] = this.formJogo.value.arbitroAuxiliar;
    pessoas[2] = this.formJogo.value.anotador;

    let pessoaOk: Boolean;
    pessoaOk = true;
    for (let i = 0; i < 14 && pessoaOk; i++) {
      for (let j = 0; j < 14; j++) {
        console.log("i=" + i + "-Id=" + pessoas[i] + ", j=" + j + "-Id=" + pessoas[j]);
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

    if (this.formJogo.value.timeA == this.formJogo.value.timeB) {
      this.Alerta("Os Times estão repitidos!!!");
    } else if (!pessoaOk) {
      this.compsalService.detalharUsuario(mensagens).subscribe((result: any) => {
        console.log(result);
        this.Alerta("Existe usuários repitidos!!!<br><br>"
          + "ID: " + result.id
          + "<br>CPF: " + result.cpf
          + "<br>Nome : " + result.nome);
      });
    } else {
      console.log(this.formJogo.value);
      this.Alerta("OK!!!");
      //this.compsalService.cadastarTimeOk(this.formJogo.value);
    }
  }

  carregarDados() {
    this.compsalService.getUsuariosMasculino().subscribe(
      data => {
        const respon = (data as any);
        const obj_retor = respon;// = JSON.parse(respon._body);
        this.lista_usuariosM = obj_retor;
        console.log(obj_retor);
        console.log(this.formJogo.value);
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
        console.log(this.formJogo.value);
      }, error => {
        this.Alerta(error.message);
        console.log(error);
      }
    );

    this.compsalService.getTimesMasculino().subscribe(
      data => {
        const respon = (data as any);
        const obj_retor = respon;// = JSON.parse(respon._body);
        this.lista_timesM = obj_retor;
        console.log(obj_retor);
        console.log(this.formJogo.value);
      }, error => {
        this.Alerta(error.message);
        console.log(error);
      }
    );
    this.compsalService.getTimesFeminino().subscribe(
      data => {
        const respon = (data as any);
        const obj_retor = respon;// = JSON.parse(respon._body);
        this.lista_timesF = obj_retor;
        console.log(obj_retor);
        console.log(this.formJogo.value);
      }, error => {
        this.Alerta(error.message);
        console.log(error);
      }
    );
  }

  async Alerta(messagem: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: messagem,
      buttons: ['OK']
    });

    await alert.present();
  }

  validaData(valor) {
    var erro: any;
    var date = valor;
    var ardt = new Array;
    var ExpReg = new RegExp("(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/[12][0-9]{3}");
    ardt = date.split("/");
    erro = false;
    if (date.search(ExpReg) == -1) {
      erro = true;
    } else if (((ardt[1] == 4) || (ardt[1] == 6) || (ardt[1] == 9) || (ardt[1] == 11)) && (ardt[0] > 30))
      erro = true;
    else if (ardt[1] == 2) {
      if ((ardt[0] > 28) && ((ardt[2] % 4) != 0))
        erro = true;
      if ((ardt[0] > 29) && ((ardt[2] % 4) == 0))
        erro = true;
    }
    if (erro) {
      console.log("*** validaDat() false");
      return false;
    }
    console.log("*** validaDat() true");
    return true;
  }

}
