import { Component, OnInit } from '@angular/core';
import { CompsalService } from '../compsal.service';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.page.html',
  styleUrls: ['./cadastrar-usuario.page.scss'],
})
export class CadastrarUsuarioPage implements OnInit {

  model: Usuario;

  constructor(private compsalService: CompsalService) { this.model = new Usuario(); }

  ngOnInit() {
  }
  criarUsuario() {
    this.compsalService.cadastarUsuario(
      null,
      this.model.nome,
      this.model.cpf,
      this.model.apelidio,
      this.model.dtNascimento,
      this.model.sexo,
      this.model.telefone,
      this.model.email,
      this.model.endereco,
      this.model.numeroEnd,
      this.model.cep,
      this.model.bairro,
      this.model.municipio,
      this.model.uf
    )
  }

}
export class Usuario {
  nome: string;
  cpf: string;
  apelidio: string;
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