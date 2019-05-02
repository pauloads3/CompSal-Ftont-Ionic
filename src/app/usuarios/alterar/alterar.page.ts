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
  usuario :any;

  

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
    let idUsuario;
    console.log(idUsuario = this.activatedRoute.snapshot.paramMap.get('id'));
    console.log(this.form.value);
    console.log("666"+this.usuario);
    console.log(this.form.setValue(this.usuario));
    console.log(this.form.value);
  }
  
  alterarUsuarioOld(){
    console.log("***alterarUsuario() Inicio");
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
    console.log("***alterarUsuario() FIM");
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

    console.log(this.form.value);
    console.log("666"+this.usuario.nome);
    console.log(this.form.setValue(this.usuario));
    console.log(this.form.value);

    //console.log(result);
    console.log(this.usuario);
    console.log("!!!!!!!!!!");
  });
  console.log("antes usu");
  console.log(usu);
  console.log("***pegarUsuario() Fim");
}

  
alterarUsuario() {
    
    console.log('***alterarUsuario() Inicio');
    console.log(this.form.value);
    this.compsalService.alterarUsuario(this.form.value);
    //this.forms();
    this.router.navigate(['/usuarios']);
    this.Alerta('Usuário alterado com sucesso!');
    console.log('***alterarUsuario() FIM');

  }
  
  
}
