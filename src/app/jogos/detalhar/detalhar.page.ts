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
  jogo: any;
  arbitroPrincipal: any;
  arbitroAuxiliar: any;
  anotador: any;
  

  constructor(private activatedRoute: ActivatedRoute, private compsalService: CompsalService) { }

  ngOnInit() {
    this.idUsuario = this.activatedRoute.snapshot.paramMap.get('id');

    //this.usuario = this.compsalService.detalharUsuario(this.idUsuario);
    console.log("antes usuario");
    var usu: any;
    console.log("antes usu!!");
    //console.log(usu);
    this.compsalService.detalharJogo(this.idUsuario).subscribe((result: any) => {
      this.jogo = result;
      this.compsalService.detalharUsuario(this.jogo.arbitroPrincipal).subscribe((result: any) => { this.arbitroPrincipal = result; });
      this.compsalService.detalharUsuario(this.jogo.arbitroAuxiliar).subscribe((result: any) => { this.arbitroAuxiliar = result; });
      this.compsalService.detalharUsuario(this.jogo.anotador).subscribe((result: any) => { this.anotador = result; });
    });
  }
}
