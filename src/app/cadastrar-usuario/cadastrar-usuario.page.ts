import { Component, OnInit } from '@angular/core';
import { CompsalService } from '../compsal.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.page.html',
  styleUrls: ['./cadastrar-usuario.page.scss'],
})
export class CadastrarUsuarioPage implements OnInit {

  model: Usuario;
  private formulario: FormGroup;

  constructor(private formBuilder: FormBuilder, private compsalService: CompsalService, public alertController: AlertController) {
    this.model = new Usuario();
    this.formulario = this.formBuilder.group({
      cpf: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  logForm() {
    console.log(this.formulario.value)
  }

  async Alerta(messagem: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: messagem,
      buttons: ['OK']
    });

    await alert.present();
  }

  criarUsuario() {
    this.compsalService.cadastarUsuario(
      null,
      this.model.nome,
      this.model.cpf,
      this.model.apelido,
      this.model.dtNascimento,
      this.model.sexo,
      this.model.telefone,
      this.model.email,
      this.model.endereco,
      this.model.numeroEnd,
      this.model.cep,
      this.model.bairro,
      this.model.municipio,
      this.model.uf
    )
  }
  excluirUsuario(id) {

    this.compsalService.excluirUsuarioa(this.model.id)

  }
  async confirmacaoUsuario() {

    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }
}
export class Usuario {
  id: number;
  nome: string;
  cpf: string;
  apelido: string;
  dtNascimento: string;
  sexo: string;
  telefone: string;
  email: string;
  endereco: string;
  numeroEnd: string;
  cep: string;
  bairro: string;
  municipio: string;
  uf: string;
}