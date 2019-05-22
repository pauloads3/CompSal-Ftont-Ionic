import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompsalService } from 'src/app/compsal.service';
import { AlertController } from '@ionic/angular';
import { Usuario } from '../usuarios.page';

@Component({
  selector: 'app-alterar',
  templateUrl: './alterar.page.html',
  styleUrls: ['./alterar.page.scss'],
})
export class AlterarPage implements OnInit {

  form: FormGroup;
  idUsuario = null; ////
  usuario: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private compsalService: CompsalService,
    public alertController: AlertController) {

    this.forms();
    this.pegarUsuario();
    // this.alterarUsuario();

  }

  ngOnInit() {
    
  }
 
  forms() {
    console.log("***forms() Inicio");
    this.form = this.formBuilder.group({
      id: null,
      nome: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      cpf: [null, [Validators.maxLength(14)]],
      apelido: [null, [Validators.maxLength(20)]],
      dtNascimento: [null, [Validators.required]],
      sexo: [null, [Validators.required]],
      telefone: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      endereco: [null, [Validators.required, Validators.maxLength(50)]],
      numeroEnd: [null, [Validators.required, Validators.maxLength(50)]],
      cep: [null, [Validators.required]],
      bairro: [null, [Validators.required, Validators.maxLength(50)]],
      municipio: [null, [Validators.required, Validators.maxLength(50)]],
      uf: [null, [Validators.required]]
    });

    console.log("***forms() FIM");
  }

  async Alerta(messagem: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: messagem,
      buttons: ['OK']
    });

    await alert.present();
  }

  pegarUsuario() {

    console.log("***pegarUsuario() Inicio");
    this.idUsuario = this.activatedRoute.snapshot.paramMap.get('id');

    //this.usuario = this.compsalService.detalharUsuario(this.idUsuario);
    console.log("antes usuario");
    var usu: any;
    console.log("antes usu!!");
    console.log(usu);
    this.compsalService.detalharUsuario(this.idUsuario).subscribe((result: any) => {
      this.usuario = result;
      this.form.setValue(this.usuario);
    });
    console.log("antes usu");
    console.log(usu);
    console.log("***pegarUsuario() Fim");
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

  alterarUsuario() {

    console.log('***alterarUsuario() Inicio');
    console.log(this.form.value);

    // Falta ajustar a data...
    if (this.validaData(this.form.value.dtNascimento)) {
      //this.Alerta("Data valida!! ");
      this.validaData(this.form.value.dtNascimento);
      this.compsalService.alterarUsuario(this.form.value);
      //this.forms();
      this.router.navigate(['/usuarios']);
      this.Alerta('Usuário alterado com sucesso!');
      console.log('***alterarUsuario() FIM');
    } else {
      this.Alerta("Data Invalida!!!!! ");
    }



  }


}
