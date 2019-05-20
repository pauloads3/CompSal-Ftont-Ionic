import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { CompsalService } from '../compsal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jogos',
  templateUrl: './jogos.page.html',
  styleUrls: ['./jogos.page.scss'],
})
export class JogosPage implements OnInit {

  public lista_jogos = new Array<any>();

  constructor(
    private navController: NavController,
    private compsalService: CompsalService,
    private router: Router,
    private alertController: AlertController
  ) {
    this.carregarDados();
  }

  ngOnInit() {
    this.carregarDados();
    console.log(this.lista_jogos);
  }

  ionViewWillEnter() {
    //this.carregarDados();    
    console.log("ionViewWillEnter()");
  }
  ionViewDidEnter() {
   // this.carregarDados();
    console.log("ionViewDidEnter()");    
  }
  ionViewWillLeaveE() {
   // this.carregarDados(); 
    console.log("ionViewWillLeaveE()");   
  }
  ionViewDidLeave() {
    //this.carregarDados();
    console.log("ionViewDidLeave()");    
  }
  carregarDados() {
    this.compsalService.getJogos().subscribe(
      data => {
        const respon = (data as any);
        const obj_retor = respon;// = JSON.parse(respon._body);
        this.lista_jogos = obj_retor;
        console.log(obj_retor);
      }, error => {
        this.Alerta(error.message);
        console.log(error);
      }
    );
  }

  detalharJogo(id: string) {
    this.navController.navigateForward(['/jogos/detalhar', id]);

  }
  alterarJogo(id: string) {
    this.navController.navigateForward(['/jogos/alterar', id]);

  }

  async excluirJogo(id: number, timeA: string, timeB: string) {

    let alert = await this.alertController.create({
      header: 'Confimação!',
      message: 'Deseja excluir o Jogo: <br><br> Id: ' + id + "<br>" + timeA + ' X ' + timeB,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            //   this.ionViewWillEnter();
            console.log("*** excluirJogo() --> this.ionViewWillEnter()");
            this.Alerta('Operação cancelada!');
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            this.compsalService.excluirJogo(id);
            console.log("*** excluirJogo() --> this.ionViewWillEnter()  2");
            this.router.navigate(['/times']);
            console.log("*** excluirJogo() --> this.ionViewWillEnter()  3");
          }
        }
      ]
    });

    await alert.present();
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
