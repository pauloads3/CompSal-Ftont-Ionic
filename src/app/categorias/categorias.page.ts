import { Component, OnInit } from '@angular/core';
import { CompsalService } from '../compsal.service';
import { AlertController } from '@ionic/angular';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],

})
export class CategoriasPage implements OnInit {

  public lista_categorias = new Array<any>();
  model: Usuario;
  brmasker: BrMaskModel;
  form: FormGroup;

  constructor(

    private formBuilder: FormBuilder,
    private compsalService: CompsalService,
    private alertController: AlertController,
    ///public brMask: BrMaskDirective
  ) {
    this.forms();

  }
  forms() {
    this.form = this.formBuilder.group({
      nome: ['Paulo', Validators.required],
      mask: [null, [Validators.maxLength(14)]],
      maskk: [null, [Validators.maxLength(10)]],
      cep: [null, [Validators.maxLength(10)]],
      telefone: [null, [Validators.maxLength(17)]],
      phone:null
    });

  }
  
  ngOnInit() {
    console.log("ConsultarSumulaPage : ngOnInit()() ")
    this.compsalService.get().subscribe(
      data => {
        const respon = (data as any);
        const obj_retor = respon;// = JSON.parse(respon._body);
        this.lista_categorias = obj_retor;
        console.log(obj_retor);
      }, error => {
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
  async excluirUsuario(id: number, nome: string) {

    let alert = await this.alertController.create({
      header: 'Confimação!',
      message: 'Deseja excluir o usuário: <h2>' + nome + '</h2>',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Operação cancelada!');
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            this.compsalService.excluirUsuario(id);
            this.Alerta("Usuário excluído com sucesso!!!");
          }
        }
      ]
    });

    await alert.present();
  }

}
export class Usuario {
  id: number;
}
class BrMaskModel {
  form: FormControl;
  mask: string;
  len: number;
  person: boolean;
  phone: boolean;
  phoneNotDDD: boolean;
  money: boolean;
  percent: boolean;
  type: 'alfa' | 'num' | 'all';
  decimal: number;
  decimalCaracter: string;
  thousand: string;
  userCaracters: boolean;
  numberAndTousand: boolean;
  moneyInitHasInt: boolean;
}