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
  formTipo: FormGroup;
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
    this.ValidarUsuarios();


  }
  forms() {
    this.formTime = this.formBuilder.group({
      id: null,
      nome: [null, [Validators.minLength(5), Validators.maxLength(50)]],
      goleiro: [null, [Validators.required]],
      fixo: [null, [Validators.required]],
      alaDireita: [null, [Validators.required]],
      alaEsquerda: [null, [Validators.required]],
      pivo: [null, [Validators.required]],
      treinador: [null, [Validators.required]],
      massagista: [null, [Validators.required]]
    });
    this.formTipo = this.formBuilder.group({
      id: null,
      nome: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      sexo: [null, [Validators.required]]
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
  ValidarUsuarios(){
    if (this.formTime.value.goleiro == [
      this.formTime.value.fixo || 
      this.formTime.value.alaDireita || 
      this.formTime.value.alaEsquerda || 
      this.formTime.value.pivo || 
      this.formTime.value.treinador || 
      this.formTime.value.massagista]) {
        this.Alerta("(Goleiro) Existe Usuario em duplicidade!");
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
