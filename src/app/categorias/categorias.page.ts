import { Component, OnInit } from '@angular/core';
import { CompsalService } from '../compsal.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],

})
export class CategoriasPage implements OnInit {

  public lista_categorias = new Array<any>();

  constructor(private compsalService: CompsalService) { }

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



}
