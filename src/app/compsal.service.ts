import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { CadastrarUsuarioPage } from './cadastrar-usuario/cadastrar-usuario.page';

@Injectable({
  providedIn: 'root'
})
export class CompsalService {

  cadastrarUsuario: CadastrarUsuarioPage;

  private URL = 'http://localhost:8080/';
  public items: any;

  constructor(public http: HttpClient, private alertController: AlertController) { this.getArbritos(); }

  getArbritos() {
    let data: any;
    data = this.http.get("http://localhost:8080/arbitros/3").subscribe(resut => { this.items = resut; });
    //console.log(this.items);
    this.http.get("http://localhost:8080/sumulas").subscribe(data => { console.log(data) });
  }
  get() {
    return this.http.get(this.URL + 'usuarios');
  }
  getUsuariosMasculino() {
    return this.http.get(this.URL + 'usuarios/findAllM');
  }
  getUsuariosFeminino() {
    return this.http.get(this.URL + 'usuarios/findAllF');
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
  async Alerta(messagem: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: messagem,
      buttons: ['OK']
    });

    await alert.present();
  }
  /*id: number, nome: string, cpf: string, apelido: string,
  dtNascimento: string, sexo: string, telefone: string, email: string, endereco: string, numeroEnd: string,
  cep: string, bairro: string, municipio: string, uf: string*/

  cadastarUsuario(usuario: any) {
    console.log(usuario);
    return new Promise((resolve, reject) => {
      var data = usuario;
      let mensagens = "";
      this.http.post(this.URL + 'usuarios/createUsuario', data)
        .subscribe((result: any) => {
          console.log(result);
          if (result.id != null) {
            this.Alerta("Usuário cadastrado com sucesso! <br><br>" + "Id: " + result.id + "<br>Nome: " + result.nome);
          }
          resolve(result.data);
        },
          (error) => {
            if (error.name == "HttpErrorResponse" && error.statusText != "OK") {
              this.Alerta("Verifique sua conexão! <br><br>" + error.statusText + "<br>" + error.url);
            } else if (error.error.errors.length > 0) {
              for (let index = 0; index < error.error.errors.length; index++) {
                mensagens += "-" + error.error.errors[index].defaultMessage + "<br><br>";
                //this.Alerta(error.error.errors[index].defaultMessage);  //para exibir uma a uma...
              }
              this.Alerta(mensagens);
            } else {
              this.Alerta(error.message);
            }
          })
    });

  }

  cadastarTime(time: any) {
    console.log(time);
    return new Promise((resolve, reject) => {
      var data = time;
      let mensagens = "";
      this.http.post(this.URL + 'times/createTime', data)
        .subscribe((result: any) => {
          console.log(result);
          if (result.id != null) {
            this.Alerta("Usuário cadastrado com sucesso! <br><br>" + "Id: " + result.id + "<br>Nome: " + result.nome);
          }
          resolve(result.data);
        },
          (error) => {
            if (error.name == "HttpErrorResponse" && error.statusText != "OK") {
              this.Alerta("Verifique sua conexão! <br><br>" + error.statusText + "<br>" + error.url);
            } else if (error.error.errors.length > 0) {
              for (let index = 0; index < error.error.errors.length; index++) {
                mensagens += "-" + error.error.errors[index].defaultMessage + "<br><br>";
                //this.Alerta(error.error.errors[index].defaultMessage);  //para exibir uma a uma...
              }
              this.Alerta(mensagens);
            } else {
              this.Alerta(error.message);
            }
          })
    });

  }


  alterarUsuario(usuario: any) {
    console.log(usuario);
    return new Promise((resolve, reject) => {
      var data = usuario;
      let mensagens = "";
      this.http.post(this.URL + 'usuarios/updateUsuario', data)
        .subscribe((result: any) => {
          console.log(result);
          if (result.id != null) {
            this.Alerta("Usuário cadastrado com sucesso! <br><br>" + "Id: " + result.id + "<br>Nome: " + result.nome);
          }
          resolve(result.data);
        },
          (error) => {
            if (error.name == "HttpErrorResponse" && error.statusText != "OK") {
              this.Alerta("Verifique sua conexão! <br><br>" + error.statusText + "<br>" + error.url);
            } else if (error.error.errors.length > 0) {
              for (let index = 0; index < error.error.errors.length; index++) {
                mensagens += "-" + error.error.errors[index].defaultMessage + "<br><br>";
                //this.Alerta(error.error.errors[index].defaultMessage);  //para exibir uma a uma...
              }
              this.Alerta(mensagens);
            } else {
              this.Alerta(error.message);
            }
          })
    });

  }

  detalharUsuario(id: string) {
    return this.http.get(this.URL + 'usuarios/' + id);
  }
  excluirUsuario(id: number) {
    return new Promise((resolve, reject) => {
      var data = {
        id: id
      };
      console.log(data);
      this.http.post(this.URL + 'usuarios/deleteUsuario', id)
        .subscribe((result: any) => {

          resolve(result.json());
          console.log(result);
        },
          (error) => {
            console.log(error.error); // error message as string
            reject(error)
          })
    });
  }
}
