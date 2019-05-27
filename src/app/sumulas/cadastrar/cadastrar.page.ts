import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompsalService } from 'src/app/compsal.service';

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
  

  constructor(private activatedRoute: ActivatedRoute, private compsalService: CompsalService) { }

  ngOnInit() {
    this.pegarJogo();
  }

  pegarJogo() {
    this.idUsuario = this.activatedRoute.snapshot.paramMap.get('id');
    this.compsalService.detalharJogo(this.idUsuario).subscribe((result: any) => {
      this.jogo = result;
      console.log(result);

      this.compsalService.detalharTimeNomeM(this.jogo.timeA).subscribe((result: any) => { this.timeA = result; 
        console.log(this.timeA);
        this.compsalService.detalharUsuario(this.timeA.goleiro).subscribe((result: any) => { this.goleiro = result; });
        this.compsalService.detalharUsuario(this.timeA.fixo).subscribe((result: any) => { this.fixo = result; });
        this.compsalService.detalharUsuario(this.timeA.alaDireita).subscribe((result: any) => { this.alaDireita = result; });
        this.compsalService.detalharUsuario(this.timeA.alaEsquerda).subscribe((result: any) => { this.alaEsquerda = result; });
        this.compsalService.detalharUsuario(this.timeA.pivo).subscribe((result: any) => { this.pivo = result; });
        this.compsalService.detalharUsuario(this.timeA.treinador).subscribe((result: any) => { this.treinador = result; });
        this.compsalService.detalharUsuario(this.timeA.massagista).subscribe((result: any) => { this.massagista = result; });
       
      });
      this.compsalService.detalharTimeNomeM(this.jogo.timeB).subscribe((result: any) => { this.timeB = result; 
        console.log(this.timeB);
        this.compsalService.detalharUsuario(this.timeB.goleiro).subscribe((result: any) => { this.goleiroB = result; });
        this.compsalService.detalharUsuario(this.timeA.fixo).subscribe((result: any) => { this.fixoB = result; });
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

}
