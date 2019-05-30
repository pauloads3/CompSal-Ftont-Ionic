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
  nometimeA: any;
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
  lista_golsAll = new Array<any>();
  qdt_golsTimeA: any;
  qdt_golsTimeAGoleiro: any;
  qdt_golsTimeAfixo: any;
  qdt_golsTimeAalaDireita: any;
  qdt_golsTimeAalaEsquerda: any;
  qdt_golsTimeApivo: any;
  
  qdt_caTimeAGoleiro: any;
  qdt_caTimeAfixo: any;
  qdt_caTimeAalaDireita: any;
  qdt_caTimeAalaEsquerda: any;
  qdt_caTimeApivo: any;
  
  qdt_cvTimeAGoleiro: any;
  qdt_cvTimeAfixo: any;
  qdt_cvTimeAalaDireita: any;
  qdt_cvTimeAalaEsquerda: any;
  qdt_cvTimeApivo: any;

  qdt_caTimeBGoleiro: any;
  qdt_caTimeBfixo: any;
  qdt_caTimeBalaDireita: any;
  qdt_caTimeBalaEsquerda: any;
  qdt_caTimeBpivo: any;
  
  qdt_cvTimeBGoleiro: any;
  qdt_cvTimeBfixo: any;
  qdt_cvTimeBalaDireita: any;
  qdt_cvTimeBalaEsquerda: any;
  qdt_cvTimeBpivo: any;

  qdt_golsTimeBGoleiro: any;
  qdt_golsTimeBfixo: any;
  qdt_golsTimeBalaDireita: any;
  qdt_golsTimeBalaEsquerda: any;
  qdt_golsTimeBpivo: any;


  qdt_golsTimeB: any;
  

  constructor(
    private navController: NavController,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private compsalService: CompsalService) {
    this.pegarJogo();
    this.carregarDados();

  }

  ngOnInit() {
    this.pegarJogo();
    this.carregarDados();
    this.carregarDados2();
  }
  ionViewWillEnter() {
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

        this.compsalService.getGolsPorTimeAndJogo(this.idUsuario, this.timeA.nome).subscribe(
          data => {
            const respon = (data as any);
            const obj_retor = respon;
            this.qdt_golsTimeA = obj_retor.length;
          }, error => {
            this.Alerta(error.message);
            console.log(error);
          }
        );
        this.compsalService.getGolsPorTimeAndJogoAndJogador(this.idUsuario, this.timeA.nome, this.timeA.goleiro).subscribe(
          data => {
            const respon = (data as any); const obj_retor = respon; this.qdt_golsTimeAGoleiro = obj_retor.length;
          }, error => { this.Alerta(error.message); console.log(error); });
        this.compsalService.getGolsPorTimeAndJogoAndJogador(this.idUsuario, this.timeA.nome, this.timeA.fixo).subscribe(
          data => {
            const respon = (data as any); const obj_retor = respon; this.qdt_golsTimeAfixo = obj_retor.length;
          }, error => { this.Alerta(error.message); console.log(error); });
        this.compsalService.getGolsPorTimeAndJogoAndJogador(this.idUsuario, this.timeA.nome, this.timeA.alaDireita).subscribe(
          data => {
            const respon = (data as any); const obj_retor = respon; this.qdt_golsTimeAalaDireita = obj_retor.length;
          }, error => { this.Alerta(error.message); console.log(error); });
        this.compsalService.getGolsPorTimeAndJogoAndJogador(this.idUsuario, this.timeA.nome, this.timeA.alaEsquerda).subscribe(
          data => {
            const respon = (data as any); const obj_retor = respon; this.qdt_golsTimeAalaEsquerda = obj_retor.length;
          }, error => { this.Alerta(error.message); console.log(error); });
        this.compsalService.getGolsPorTimeAndJogoAndJogador(this.idUsuario, this.timeA.nome, this.timeA.pivo).subscribe(
          data => {
            const respon = (data as any); const obj_retor = respon; this.qdt_golsTimeApivo = obj_retor.length;
          }, error => { this.Alerta(error.message); console.log(error); });

          this.compsalService.getCartaoAmareloPorTimeAndJogoAndJogador(this.idUsuario, this.timeA.nome, this.timeA.goleiro).subscribe(
            data => {
              const respon = (data as any); const obj_retor = respon; this.qdt_caTimeAGoleiro = obj_retor.length;
            }, error => { this.Alerta(error.message); console.log(error); });
          this.compsalService.getCartaoAmareloPorTimeAndJogoAndJogador(this.idUsuario, this.timeA.nome, this.timeA.fixo).subscribe(
            data => {
              const respon = (data as any); const obj_retor = respon; this.qdt_caTimeAfixo = obj_retor.length;
            }, error => { this.Alerta(error.message); console.log(error); });
          this.compsalService.getCartaoAmareloPorTimeAndJogoAndJogador(this.idUsuario, this.timeA.nome, this.timeA.alaDireita).subscribe(
            data => {
              const respon = (data as any); const obj_retor = respon; this.qdt_caTimeAalaDireita = obj_retor.length;
            }, error => { this.Alerta(error.message); console.log(error); });
          this.compsalService.getCartaoAmareloPorTimeAndJogoAndJogador(this.idUsuario, this.timeA.nome, this.timeA.alaEsquerda).subscribe(
            data => {
              const respon = (data as any); const obj_retor = respon; this.qdt_caTimeAalaEsquerda = obj_retor.length;
            }, error => { this.Alerta(error.message); console.log(error); });
          this.compsalService.getCartaoAmareloPorTimeAndJogoAndJogador(this.idUsuario, this.timeA.nome, this.timeA.pivo).subscribe(
            data => {
              const respon = (data as any); const obj_retor = respon; this.qdt_caTimeApivo = obj_retor.length;
            }, error => { this.Alerta(error.message); console.log(error); });

            this.compsalService.getCartaoVermelhoPorTimeAndJogoAndJogador(this.idUsuario, this.timeA.nome, this.timeA.goleiro).subscribe(
              data => {
                const respon = (data as any); const obj_retor = respon; this.qdt_cvTimeAGoleiro = obj_retor.length;
              }, error => { this.Alerta(error.message); console.log(error); });
            this.compsalService.getCartaoVermelhoPorTimeAndJogoAndJogador(this.idUsuario, this.timeA.nome, this.timeA.fixo).subscribe(
              data => {
                const respon = (data as any); const obj_retor = respon; this.qdt_cvTimeAfixo = obj_retor.length;
              }, error => { this.Alerta(error.message); console.log(error); });
            this.compsalService.getCartaoVermelhoPorTimeAndJogoAndJogador(this.idUsuario, this.timeA.nome, this.timeA.alaDireita).subscribe(
              data => {
                const respon = (data as any); const obj_retor = respon; this.qdt_cvTimeAalaDireita = obj_retor.length;
              }, error => { this.Alerta(error.message); console.log(error); });
            this.compsalService.getCartaoVermelhoPorTimeAndJogoAndJogador(this.idUsuario, this.timeA.nome, this.timeA.alaEsquerda).subscribe(
              data => {
                const respon = (data as any); const obj_retor = respon; this.qdt_cvTimeAalaEsquerda = obj_retor.length;
              }, error => { this.Alerta(error.message); console.log(error); });
            this.compsalService.getCartaoVermelhoPorTimeAndJogoAndJogador(this.idUsuario, this.timeA.nome, this.timeA.pivo).subscribe(
              data => {
                const respon = (data as any); const obj_retor = respon; this.qdt_cvTimeApivo = obj_retor.length;
              }, error => { this.Alerta(error.message); console.log(error); });

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

        this.compsalService.getGolsPorTimeAndJogo(this.idUsuario, this.timeB.nome).subscribe(
          data => {
            const respon = (data as any);
            const obj_retor = respon;
            this.qdt_golsTimeB = obj_retor.length;
          }, error => {
            this.Alerta(error.message);
            console.log(error);
          }
        );
        this.compsalService.getGolsPorTimeAndJogoAndJogador(this.idUsuario, this.timeB.nome, this.timeB.goleiro).subscribe(
          data => {
            const respon = (data as any); const obj_retor = respon; this.qdt_golsTimeBGoleiro = obj_retor.length;
          }, error => { this.Alerta(error.message); console.log(error); });
        this.compsalService.getGolsPorTimeAndJogoAndJogador(this.idUsuario, this.timeB.nome, this.timeB.fixo).subscribe(
          data => {
            const respon = (data as any); const obj_retor = respon; this.qdt_golsTimeBfixo = obj_retor.length;
          }, error => { this.Alerta(error.message); console.log(error); });
        this.compsalService.getGolsPorTimeAndJogoAndJogador(this.idUsuario, this.timeB.nome, this.timeB.alaDireita).subscribe(
          data => {
            const respon = (data as any); const obj_retor = respon; this.qdt_golsTimeBalaDireita = obj_retor.length;
          }, error => { this.Alerta(error.message); console.log(error); });
        this.compsalService.getGolsPorTimeAndJogoAndJogador(this.idUsuario, this.timeB.nome, this.timeB.alaEsquerda).subscribe(
          data => {
            const respon = (data as any); const obj_retor = respon; this.qdt_golsTimeBalaEsquerda = obj_retor.length;
          }, error => { this.Alerta(error.message); console.log(error); });
        this.compsalService.getGolsPorTimeAndJogoAndJogador(this.idUsuario, this.timeB.nome, this.timeB.pivo).subscribe(
          data => {
            const respon = (data as any); const obj_retor = respon; this.qdt_golsTimeBpivo = obj_retor.length;
          }, error => { this.Alerta(error.message); console.log(error); });


          this.compsalService.getCartaoAmareloPorTimeAndJogoAndJogador(this.idUsuario, this.timeB.nome, this.timeB.goleiro).subscribe(
            data => {
              const respon = (data as any); const obj_retor = respon; this.qdt_caTimeBGoleiro = obj_retor.length;
            }, error => { this.Alerta(error.message); console.log(error); });
          this.compsalService.getCartaoAmareloPorTimeAndJogoAndJogador(this.idUsuario, this.timeB.nome, this.timeB.fixo).subscribe(
            data => {
              const respon = (data as any); const obj_retor = respon; this.qdt_caTimeBfixo = obj_retor.length;
            }, error => { this.Alerta(error.message); console.log(error); });
          this.compsalService.getCartaoAmareloPorTimeAndJogoAndJogador(this.idUsuario, this.timeB.nome, this.timeB.alaDireita).subscribe(
            data => {
              const respon = (data as any); const obj_retor = respon; this.qdt_caTimeBalaDireita = obj_retor.length;
            }, error => { this.Alerta(error.message); console.log(error); });
          this.compsalService.getCartaoAmareloPorTimeAndJogoAndJogador(this.idUsuario, this.timeB.nome, this.timeB.alaEsquerda).subscribe(
            data => {
              const respon = (data as any); const obj_retor = respon; this.qdt_caTimeBalaEsquerda = obj_retor.length;
            }, error => { this.Alerta(error.message); console.log(error); });
          this.compsalService.getCartaoAmareloPorTimeAndJogoAndJogador(this.idUsuario, this.timeB.nome, this.timeB.pivo).subscribe(
            data => {
              const respon = (data as any); const obj_retor = respon; this.qdt_caTimeBpivo = obj_retor.length;
            }, error => { this.Alerta(error.message); console.log(error); });

            this.compsalService.getCartaoVermelhoPorTimeAndJogoAndJogador(this.idUsuario, this.timeB.nome, this.timeB.goleiro).subscribe(
              data => {
                const respon = (data as any); const obj_retor = respon; this.qdt_cvTimeBGoleiro = obj_retor.length;
              }, error => { this.Alerta(error.message); console.log(error); });
            this.compsalService.getCartaoVermelhoPorTimeAndJogoAndJogador(this.idUsuario, this.timeB.nome, this.timeB.fixo).subscribe(
              data => {
                const respon = (data as any); const obj_retor = respon; this.qdt_cvTimeBfixo = obj_retor.length;
              }, error => { this.Alerta(error.message); console.log(error); });
            this.compsalService.getCartaoVermelhoPorTimeAndJogoAndJogador(this.idUsuario, this.timeB.nome, this.timeB.alaDireita).subscribe(
              data => {
                const respon = (data as any); const obj_retor = respon; this.qdt_cvTimeBalaDireita = obj_retor.length;
              }, error => { this.Alerta(error.message); console.log(error); });
            this.compsalService.getCartaoVermelhoPorTimeAndJogoAndJogador(this.idUsuario, this.timeB.nome, this.timeB.alaEsquerda).subscribe(
              data => {
                const respon = (data as any); const obj_retor = respon; this.qdt_cvTimeBalaEsquerda = obj_retor.length;
              }, error => { this.Alerta(error.message); console.log(error); });
            this.compsalService.getCartaoVermelhoPorTimeAndJogoAndJogador(this.idUsuario, this.timeB.nome, this.timeB.pivo).subscribe(
              data => {
                const respon = (data as any); const obj_retor = respon; this.qdt_cvTimeBpivo = obj_retor.length;
              }, error => { this.Alerta(error.message); console.log(error); });


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
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Registrar',
          handler: data => {

            if (data.tempo > 0 && data.tempo <= 50) {
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
              let arr = { tipo, idJogador, nomeJogador, nomeTime, idJogo, tempoOk2 }
              this.lista_golsGoleiro.push(tipo, idJogador, nomeJogador, nomeTime, idJogo, tempoOk);
              this.placarA += 1;
              console.log(this.lista_golsGoleiro.length);
              console.log(this.lista_golsGoleiro);
              this.compsalService.cadastarEventos(data1);
              this.carregarDados();


            } else if (data.tempo > 50) {
              this.Alerta('Tempo maior que 50');
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

  }

  carregarDados2() {
    console.log(this.lista_golsAll.length);

  }
}
