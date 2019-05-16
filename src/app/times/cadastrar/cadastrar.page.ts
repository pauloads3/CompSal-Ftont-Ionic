import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompsalService } from 'src/app/compsal.service';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/app/categorias/categorias.page';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {

  formTime: FormGroup;
  lista_usuariosM = new Array<any>();
  lista_usuariosF = new Array<any>();
  lista_categorias = [{ id: 1, nome: 'Paulo' }, { id: 2, nome: 'Roberto' }, { id: 3, nome: 'Vivianne' }];

  labelAttribute = "name";

  constructor(
    private formBuilder: FormBuilder,
    private compsalService: CompsalService,
    private alertController: AlertController,
    public http: HttpClient
  ) {
    this.forms();
    //this.lista_usuariosM = [{ id: 1, nome: 'Paulo' }, { id: 2, nome: 'Roberto' }, { id: 3, nome: 'Ricardo' }];
  }

  ngOnInit() {
    this.carregarDados();
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


  getResults(keyword: string) {
    return "Teste";
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
  
  async Alerta(messagem: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: messagem,
      buttons: ['OK']
    });

    await alert.present();
  }

}
