import { Component, OnInit } from '@angular/core';
import { CompsalService } from '../compsal.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],

})
export class CategoriasPage implements OnInit {

  public lista_categorias = new Array<any>();
  model: Usuario;
  constructor(private compsalService: CompsalService, private alertController: AlertController) { }

  ngOnInit() {
   console.log("ConsultarSumulaPage : ngOnInit()() ")
    this.compsalService.get().subscribe( 
      data=>{
        const respon = (data as any);
        const obj_retor = respon;// = JSON.parse(respon._body);
        this.lista_categorias = obj_retor;
        console.log(obj_retor);
      },error => {
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
  async excluirUsuario(id:number, nome:string){
    
    let alert = await this.alertController.create({
      header: 'Confimação!',
      message: 'Deseja excluir o usuário: <h2>'+ nome +'</h2>',
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
            this.compsalService.excluirUsuarioa(id);
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