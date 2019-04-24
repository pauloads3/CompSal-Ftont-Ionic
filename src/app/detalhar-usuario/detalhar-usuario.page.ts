import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompsalService } from '../compsal.service';


@Component({
  selector: 'app-detalhar-usuario',
  templateUrl: './detalhar-usuario.page.html',
  styleUrls: ['./detalhar-usuario.page.scss'],
})
export class DetalharUsuarioPage implements OnInit {

  idUsuario = null;
  usuario : {apelido: null, bairro: null, cep: null, cpf: null, dtNascimento: null, email: null, endereco: null, id: null,
  municipio: null,
  nome: null,
  numeroEnd: null,
  sexo: null,
  telefone: null,
  uf: null};

  public lista_categorias = new Array<any>();

  constructor(private activatedRoute: ActivatedRoute, private compsalService: CompsalService) {
    //this.usuario = new UsuarioDetalhar();
  }

  ngOnInit() {
    
    this.idUsuario = this.activatedRoute.snapshot.paramMap.get('id');
    
    //this.usuario = this.compsalService.detalharUsuario(this.idUsuario);
    console.log("antes usuario");
    var usu:any;
    console.log("antes usu!!");
    console.log(usu);
    this.compsalService.detalharUsuario(this.idUsuario).subscribe((result: any) => {
      this.usuario = result;
      //resolve(result.json());
      console.log(this.usuario);
      console.log("!!!!!!!!!!");
    });
    console.log("antes usu");
    console.log(usu);
    
    
  }

}
export class UsuarioDetalhar {
  id: string;
  nome: string;
  cpf: string;
  apelido: string;
  dtNascimento: string;
  sexo: string;
  telefone: string;
  email: string;
  endereco: string;
  numeroEnd: string;
  cep: string;
  bairro: string;
  municipio: string;
  uf: string;
}