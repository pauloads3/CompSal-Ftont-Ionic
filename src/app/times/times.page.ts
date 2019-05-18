import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { CompsalService } from '../compsal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-times',
  templateUrl: './times.page.html',
  styleUrls: ['./times.page.scss'],
})
export class TimesPage implements OnInit {


  //lista_categorias = [{id:1, nome:'Paulo'},{id:2, nome:'Roberto'},{id:3, nome:'Vivianne'}];

  public lista_times = new Array<any>();

  constructor(
    private navController: NavController,
    private compsalService: CompsalService,
    private router: Router,
    private alertController: AlertController

  ) {
    console.log("constructor()");
    this.carregarDados();
  }

  ngOnInit() {
    console.log("ngOnInit()");
    this.carregarDados();
  }

  ionViewWillEnter() {
    console.log("ionViewWillEnter()");
    this.carregarDados();
  }

  carregarDados() {
    this.compsalService.getTimes().subscribe(
      data => {
        const respon = (data as any);
        const obj_retor = respon;// = JSON.parse(respon._body);
        this.lista_times = obj_retor;
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
  detalharTime(id: string) {
    this.navController.navigateForward(['/times/detalhar', id]);

  }
  alterarTime(id: string) {
    this.navController.navigateForward(['/times/alterar', id]);

  }

  ///terminar
  async excluirTime(id: number, nome: string) {

    let alert = await this.alertController.create({
      header: 'Confimação!',
      message: 'Deseja excluir o time: <h2>' + nome + '</h2>',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            //   this.ionViewWillEnter();
            console.log("*** excluirTime() --> this.ionViewWillEnter()");
            this.Alerta('Operação cancelada!');
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            this.compsalService.excluirTime(id);
            console.log("*** excluirTime() --> this.ionViewWillEnter()  2");
            this.router.navigateByUrl('localhost:8100/times');
            console.log("*** excluirTime() --> this.ionViewWillEnter()  3");
          }
        }
      ]
    });
    
    await alert.present();
  }


}
