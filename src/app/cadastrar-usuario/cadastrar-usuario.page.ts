import { Component, OnInit } from '@angular/core';
import { CompsalService } from '../compsal.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.page.html',
  styleUrls: ['./cadastrar-usuario.page.scss'],
})
export class CadastrarUsuarioPage implements OnInit {

  form: FormGroup;
  idUsuario = null; ////
  usuario :any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private compsalService: CompsalService,
    public alertController: AlertController) {

    this.forms();
    this.alterarUsuario();
    this.pegarUsuario();
  }
  

  alterarUsuario(){
    this.idUsuario = this.activatedRoute.snapshot.paramMap.get('id');
    
    //this.usuario = this.compsalService.detalharUsuario(this.idUsuario);
    console.log("antes usuario");
    var usu:any;
    console.log("antes usu!!");
    console.log(usu);
    this.compsalService.detalharUsuario(this.idUsuario).subscribe((result: any) => {
      this.form.setValue = result;
      //resolve(result.json());
     // console.log(usuario);
     console.log(result.nome);
      console.log(this.form.value.nome);
    });
    console.log("antes usu");
    console.log(usu);
    
  }

  forms() {
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


  }
  ngOnInit() {
    //this.alterarUsuario();
  }
  
  async Alerta(messagem: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: messagem,
      buttons: ['OK']
    });

    await alert.present();
  }

pegarUsuario(){

  console.log("***pegarUsuario() Inicio");
  this.idUsuario = this.activatedRoute.snapshot.paramMap.get('id');
    
  //this.usuario = this.compsalService.detalharUsuario(this.idUsuario);
  console.log("antes usuario");
  var usu:any;
  console.log("antes usu!!");
  console.log(usu);
  this.compsalService.detalharUsuario(this.idUsuario).subscribe((result: any) => {
    this.usuario = result;
    //resolve(result.json());
    console.log(this.usuario);
    console.log("!!!!!!!!!!");
  });
  console.log("antes usu");
  console.log(usu);
  console.log("***pegarUsuario() Fim");
}

  
  criarUsuario() {
    
    console.log('***criarUsuario()');
    console.log(this.form);
    console.log(this.form.value);
    this.compsalService.cadastarUsuario(this.form.value);
    //this.forms();
    this.router.navigate(['/usuarios']);
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