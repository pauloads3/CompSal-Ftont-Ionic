import { Component, OnInit } from '@angular/core';
import { CompsalService } from '../compsal.service';

@Component({
  selector: 'app-cadastrar-arbitro',
  templateUrl: './cadastrar-arbitro.page.html',
  styleUrls: ['./cadastrar-arbitro.page.scss'],
})
export class CadastrarArbitroPage implements OnInit {

  model: Arbitro;

  constructor(private compsalService:CompsalService) {this.model = new Arbitro(); }

  ngOnInit() {
  }
  criar()
  {
    this.compsalService.cadastarArbitro(null ,this.model.nome, this.model.funcao)
  }
}
export class Arbitro{
  nome: string;
  funcao: string;
}