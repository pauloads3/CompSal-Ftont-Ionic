import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompsalService } from 'src/app/compsal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-alterar',
  templateUrl: './alterar.page.html',
  styleUrls: ['./alterar.page.scss'],
})
export class AlterarPage implements OnInit {
  formJogo: FormGroup;
  lista_usuariosM = new Array<any>();
  lista_usuariosF = new Array<any>();
  lista_timesM = new Array<any>();
  lista_timesF = new Array<any>();
  idJogo = null;
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
   this. pegarUsuario();
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

  alterarJogo() {
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
      this.Alerta("Data Invalida!!!!! ");
    } else {
      console.log(this.formJogo.value);
      //this.Alerta("OK!!!");
      this.compsalService.alterarJogo(this.formJogo.value);
      this.router.navigate(['/jogos']);
    }
  }


  pegarUsuario() {

    this.idJogo = this.activatedRoute.snapshot.paramMap.get('id');
    this.compsalService.detalharJogo(this.idJogo).subscribe((result: any) => {
      this.usuario = result;
      this.usuario.arbitroPrincipal = this.usuario.arbitroPrincipal.toString();
      this.usuario.arbitroAuxiliar = this.usuario.arbitroAuxiliar.toString();
      this.usuario.anotador = this.usuario.anotador.toString();      
      this.formJogo.setValue(this.usuario);
    });


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
