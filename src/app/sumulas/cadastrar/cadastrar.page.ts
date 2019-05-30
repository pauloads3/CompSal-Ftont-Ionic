import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompsalService } from 'src/app/compsal.service';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {

  idUsuario = null;
  jogo: any;
  timeA: any;
  timeB: any;
  arbitroPrincipal: any;
  arbitroAuxiliar: any;
  anotador: any;
  goleiro: any;

  fixo: any;
  alaDireita: any;
  alaEsquerda: any;
  pivo: any;
  treinador: any;
  massagista: any;

  goleiroB: any;
  fixoB: any;
  alaDireitaB: any;
  alaEsquerdaB: any;
  pivoB: any;
  treinadorB: any;
  massagistaB: any;

  placarA = 0;
  placarB = 0;

  lista_gols = new Array<any>();
  lista_golsGoleiro = new Array<any>();
  lista_golsTimeA = new Array<any>();

  constructor(
    private navController: NavController,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private compsalService: CompsalService) { 

      this.carregarDados();
    }

  ngOnInit() {
    this.pegarJogo();
    this.carregarDados();
  }
  ionViewWillEnter(){
    this.carregarDados();
  }

  pegarJogo() {
    this.idUsuario = this.activatedRoute.snapshot.paramMap.get('id');
    this.compsalService.detalharJogo(this.idUsuario).subscribe((result: any) => {
      this.jogo = result;
      console.log(result);

      this.compsalService.detalharTimeNomeM(this.jogo.timeA).subscribe((result: any) => {
        this.timeA = result;
        console.log(this.timeA);
        this.compsalService.detalharUsuario(this.timeA.goleiro).subscribe((result: any) => { this.goleiro = result; });
        this.compsalService.detalharUsuario(this.timeA.fixo).subscribe((result: any) => { this.fixo = result; });
        this.compsalService.detalharUsuario(this.timeA.alaDireita).subscribe((result: any) => { this.alaDireita = result; });
        this.compsalService.detalharUsuario(this.timeA.alaEsquerda).subscribe((result: any) => { this.alaEsquerda = result; });
        this.compsalService.detalharUsuario(this.timeA.pivo).subscribe((result: any) => { this.pivo = result; });
        this.compsalService.detalharUsuario(this.timeA.treinador).subscribe((result: any) => { this.treinador = result; });
        this.compsalService.detalharUsuario(this.timeA.massagista).subscribe((result: any) => { this.massagista = result; });
      });
      this.compsalService.detalharTimeNomeM(this.jogo.timeB).subscribe((result: any) => {
        this.timeB = result;
        console.log(this.timeB);
        this.compsalService.detalharUsuario(this.timeB.goleiro).subscribe((result: any) => { this.goleiroB = result; });
        this.compsalService.detalharUsuario(this.timeB.fixo).subscribe((result: any) => { this.fixoB = result; });
        this.compsalService.detalharUsuario(this.timeB.alaDireita).subscribe((result: any) => { this.alaDireitaB = result; });
        this.compsalService.detalharUsuario(this.timeB.alaEsquerda).subscribe((result: any) => { this.alaEsquerdaB = result; });
        this.compsalService.detalharUsuario(this.timeB.pivo).subscribe((result: any) => { this.pivoB = result; });
        this.compsalService.detalharUsuario(this.timeB.treinador).subscribe((result: any) => { this.treinadorB = result; });
        this.compsalService.detalharUsuario(this.timeB.massagista).subscribe((result: any) => { this.massagistaB = result; });
      });
      this.compsalService.detalharUsuario(this.jogo.arbitroPrincipal).subscribe((result: any) => { this.arbitroPrincipal = result; });
      this.compsalService.detalharUsuario(this.jogo.arbitroAuxiliar).subscribe((result: any) => { this.arbitroAuxiliar = result; });
      this.compsalService.detalharUsuario(this.jogo.anotador).subscribe((result: any) => { this.anotador = result; });
    });
  }
  
  async Alerta(messagem: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: messagem,
      buttons: ['OK']
    });

    await alert.present();
  }

  async eventos(tipo, idJogador, nomeJogador, nomeTime, idJogo) {
    let alert = await this.alertController.create({
      header: tipo,
      subHeader: 'Equipe: ' + nomeTime,
      message: 'Atleta: ' + nomeJogador,
      inputs: [
        {
          name: 'tempo',
          placeholder: '0',
          type: 'number',
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Registrar',
          handler: data => {
            
            if (data.tempo > 0 && data.tempo <= 90) {
              let tempoOk: any;
              let tempoOk2: number;
              tempoOk = data;
              tempoOk = tempoOk.tempo;
              //tempoOk2 = tempoOk;
              console.log(tempoOk);
              var data1 = {
                tipo: tipo,
                idJogador: idJogador,
                nomeJogador: nomeJogador,
                nomeTime: nomeTime,
                idJogo: idJogo,
                tempo: data.tempo,
              };
              console.log(this.lista_golsGoleiro.length);              
              let arr = {tipo, idJogador, nomeJogador, nomeTime, idJogo, tempoOk2}
              this.lista_golsGoleiro.push(tipo, idJogador, nomeJogador, nomeTime, idJogo, tempoOk);
              this.placarA += 1;
              console.log(this.lista_golsGoleiro.length);
              console.log(this.lista_golsGoleiro);
              this.compsalService.cadastarEventos(data1); 
              this.carregarDados();
               
                        
            } else if (data.tempo > 90) {
              this.Alerta('Tempo maior que 90');
              return false;
            } else {
              this.Alerta('Tempo invalido!! ');
              return false;
            }


          }
        }
      ]
    });
    await alert.present();

  }

  carregarDados() {
    this.compsalService.getGolsPorTimeAndJogo().subscribe(
      data => {
        const respon = (data as any);
        const obj_retor = respon;// = JSON.parse(respon._body);
        this.lista_golsTimeA = obj_retor;
        console.log(obj_retor);
      }, error => {
        this.Alerta(error.message);
        console.log(error);
      }
    );
  }
}
