import { Component, OnInit } from '@angular/core';
import { CompsalService } from '../compsal.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.page.html',
  styleUrls: ['./cadastrar-usuario.page.scss'],
})
export class CadastrarUsuarioPage implements OnInit {

  model: Usuario;
  private formulario : FormGroup;

  constructor(private formBuilder: FormBuilder, private compsalService: CompsalService) { 
    this.model = new Usuario(); 
    this.formulario = this.formBuilder.group({
      cpf: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  logForm(){
    console.log(this.formulario.value)
  } 

  criarUsuario() {
    this.compsalService.cadastarUsuario(
      null,
      this.model.nome,
      this.model.cpf,
      this.model.apelido,
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