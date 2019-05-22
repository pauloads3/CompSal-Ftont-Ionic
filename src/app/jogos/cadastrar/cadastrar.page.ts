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

  constructor(
    private formBuilder: FormBuilder,
    private compsalService: CompsalService,
    private router: Router,
    private alertController: AlertController
  ) {
    this.forms();
    this.carregarDados();
  }

  ngOnInit() {
    this.carregarDados();
  }

  ionViewWillEnter() {
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

  validarHora(valor) {
    //texto = "24:52";
    if (valor.substring(0, 2) > 23) {
      console.log("Hora inválida!!! " + valor);
      return false;
    } else if (valor.substring(3, 5) > 59) {
      console.log("Hora inválida!!! " + valor);
      return false;
    } else {
      console.log("OK! " + valor);
      console.log(valor.substring(0, 2));
      console.log(valor.substring(3, 5));
      return true;

    }

  }

  criarJogo() {
    let mensagens = "";
    let pessoas: Array<number> = new Array<number>();
    pessoas[0] = this.formJogo.value.arbitroPrincipal;
    pessoas[1] = this.formJogo.value.arbitroAuxiliar;
    pessoas[2] = this.formJogo.value.anotador;

    let pessoaOk: Boolean;
    pessoaOk = true;
    for (let i = 0; i < 3 && pessoaOk; i++) {
      for (let j = 0; j < 3; j++) {
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
    } else if (!this.validaData(this.formJogo.value.dataJogo)) {
      this.Alerta("Data Inválida!!!!! ");
    } else if (!this.validarHora(this.formJogo.value.horario)) {
      this.Alerta("Hora Inválida!!!!! ");
    } else {
      console.log(this.formJogo.value);
      // this.Alerta("OK!!!");
      this.compsalService.cadastarJogo(this.formJogo.value);
      //this.router.navigate(['/jogos']);
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


