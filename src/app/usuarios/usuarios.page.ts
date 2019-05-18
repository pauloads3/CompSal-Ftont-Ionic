import { Component, OnInit } from '@angular/core';
import { CompsalService } from '../compsal.service';
import { AlertController, NavController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  public lista_categorias = new Array<any>();
  model: Usuario;

  constructor(private compsalService: CompsalService, private alertController: AlertController, private navController: NavController) { }

  ngOnInit() {
   this.carregarDados();
  }

  carregarDados(){
    this.compsalService.get().subscribe(
      data => {
        const respon = (data as any);
        const obj_retor = respon;// = JSON.parse(respon._body);
        this.lista_categorias = obj_retor;
        console.log(obj_retor);
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

  detalharUsuario(id: string){
    this.navController.navigateForward(['/usuarios/detalhar', id]);
    
  }

  ionViewWillEnter(){
    this.carregarDados();
  }

  alterarUsuario(id: string){
    this.navController.navigateForward(['/usuarios/alterar', id]);
    
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
            this.ionViewWillEnter();
            console.log("*** excluirUsuario() --> this.ionViewWillEnter()");
            this.Alerta('Operação cancelada!');
                      }
        }, {
          text: 'Confirmar',
          handler: () => {
            this.compsalService.excluirUsuario(id);
            console.log("*** excluirUsuario() --> this.ionViewWillEnter()  2");
            this.ionViewWillEnter();            
            this.carregarDados();
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