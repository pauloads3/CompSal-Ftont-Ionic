import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompsalService {

  private URL = 'http://localhost:8080/';

  public items: any;
  constructor(public http: HttpClient) { this.getArbritos(); }

  getArbritos() {
    let data: any;
    data = this.http.get("http://localhost:8080/arbitros/3").subscribe(resut => { this.items = resut; });
    console.log(this.items);
    this.http.get("http://localhost:8080/sumulas").subscribe(data => { console.log(data) });
  }
  get() {
    return this.http.get(this.URL + "usuarios");

  }

  createArbitro(descricao: string) {
    return new Promise((resolve, reject) => {
      var data = {
        id: null,
        descricao: descricao
      };
      this.http.post(this.URL + 'createArbitro', data)
        .subscribe((result: any) => {
          resolve(result.json());
        },
          (error) => {
            reject(error.json());
          })
    });
  }
  cadastarArbitro(id: number, nome: string, funcao: string) {
    return new Promise((resolve, reject) => {
      var data = {
        id: id,
        nome: nome,
        funcao: funcao
      };
      console.log(data);
      this.http.post("http://localhost:8080/arbitros/createArbitro", data)
        .subscribe((result: any) => {
          resolve(result.json());
          console.log(data);
        },
          (error) => {
            reject(error.json())
          })
    });
  }

  cadastarUsuario(id: number, nome: string, cpf: string, apelido: string,
    dtNascimento: string, sexo: string, telefone: string, email: string, endereco: string, numeroEnd: string,
    cep: string, bairro: string, municipio: string, uf: string) {
    return new Promise((resolve, reject) => {
      var data = {
        id: id,
        nome: nome,
        cpf: cpf,
        apelido: apelido,
        dtNascimento: dtNascimento,
        sexo: sexo,
        telefone: telefone,
        email: email,
        endereco: endereco,
        numeroEnd: numeroEnd,
        cep: cep,
        bairro: bairro,
        municipio: municipio,
        uf: uf
      };
      console.log("antes");
      console.log(data);
      console.log("depois");
      this.http.post("http://localhost:8080/usuarios/createUsuario", data)
        .subscribe((result: any) => {

          resolve(result.data);
         // console.log(result.json());
        },
          (error) => {
            reject(error)
          })
    });
  }
  cadastarUsuarioaa(id: number, nome: string, cpf: string, apelido: string,
    dtNascimento: string, sexo: string, telefone: string, email: string, endereco: string, numeroEnd: string,
    cep: string, bairro: string, municipio: string, uf: string) {
    return new Promise((resolve, reject) => {
      var data = {
        id: id,
        nome: nome,
        cpf: cpf,
        apelido: apelido,
        dtNascimento: dtNascimento,
        sexo: sexo,
        telefone: telefone,
        email: email,
        endereco: endereco,
        numeroEnd: numeroEnd,
        cep: cep,
        bairro: bairro,
        municipio: municipio,
        uf: uf
      };
      console.log("antes");
      console.log(data);
      console.log("depois");
      this.http.post("http://localhost:8080/usuarios/createUsuario", data)
        .subscribe((result: any) => {

          resolve(result.json());
          console.log(result);
          console.log("!!!!!!!!!!");
        },
          (error) => {
            console.log(error.status);
            console.log(error.error); // error message as string
            console.log(error.headers);
            
            reject(error)
          })
    });
  }
}
