import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompsalService } from 'src/app/compsal.service';

@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
})
export class DetalharPage implements OnInit {

  idUsuario = null;
  time: any;
  goleiro: any;
  fixo: any;
  alaDireita: any;
  alaEsquerda: any;
  pivo: any;
  treinador: any;
  massagista: any;
  jogadorReserva1: any;
  jogadorReserva2: any;
  jogadorReserva3: any;
  jogadorReserva4: any;
  jogadorReserva5: any;

  constructor(private activatedRoute: ActivatedRoute, private compsalService: CompsalService) { }

  ngOnInit() {
    this.idUsuario = this.activatedRoute.snapshot.paramMap.get('id');

    //this.usuario = this.compsalService.detalharUsuario(this.idUsuario);
    console.log("antes usuario");
    var usu: any;
    console.log("antes usu!!");
    //console.log(usu);
    this.compsalService.detalharTime(this.idUsuario).subscribe((result: any) => {
      this.time = result;
      this.compsalService.detalharUsuario(this.time.goleiro).subscribe((result: any) => { this.goleiro = result; });
      this.compsalService.detalharUsuario(this.time.fixo).subscribe((result: any) => { this.fixo = result; });
      this.compsalService.detalharUsuario(this.time.alaDireita).subscribe((result: any) => { this.alaDireita = result; });
      this.compsalService.detalharUsuario(this.time.alaEsquerda).subscribe((result: any) => { this.alaEsquerda = result; });
      this.compsalService.detalharUsuario(this.time.pivo).subscribe((result: any) => { this.pivo = result; });
      this.compsalService.detalharUsuario(this.time.treinador).subscribe((result: any) => { this.treinador = result; });
      this.compsalService.detalharUsuario(this.time.massagista).subscribe((result: any) => { this.massagista = result; });
      if (this.time.jogadorReserva1 != null) {
        this.compsalService.detalharUsuario(this.time.jogadorReserva1).subscribe((result: any) => { this.jogadorReserva1 = result; });
      }
      if (this.time.jogadorReserva2 != null) {
        this.compsalService.detalharUsuario(this.time.jogadorReserva2).subscribe((result: any) => { this.jogadorReserva2 = result; });
      }
      if (this.time.jogadorReserva3 != null) {
        this.compsalService.detalharUsuario(this.time.jogadorReserva3).subscribe((result: any) => { this.jogadorReserva3 = result; });
      }
      if (this.time.jogadorReserva4 != null) {
        this.compsalService.detalharUsuario(this.time.jogadorReserva4).subscribe((result: any) => { this.jogadorReserva4 = result; });
      }
      if (this.time.jogadorReserva5 != null) {
        this.compsalService.detalharUsuario(this.time.jogadorReserva5).subscribe((result: any) => { this.jogadorReserva5 = result; });
      }
    });
  }
}
