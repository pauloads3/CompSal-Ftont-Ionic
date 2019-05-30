import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { CadastrarUsuarioPage } from './cadastrar-usuario/cadastrar-usuario.page';
import { Router } from '@angular/router';
import { JogosPage } from './jogos/jogos.page';

@Injectable({
  providedIn: 'root'
})
export class CompsalService {

  cadastrarUsuario: CadastrarUsuarioPage;
  usuario: any;
  private URL = 'http://localhost:8080/';
  public items: any;

  constructor(public http: HttpClient, private alertController: AlertController, private router: Router ) { this.getArbritos(); }

  getArbritos() {
    let data: any;
    data = this.http.get("http://localhost:8080/arbitros/3").subscribe(resut => { this.items = resut; });
    //console.log(this.items);
    this.http.get("http://localhost:8080/sumulas").subscribe(data => { console.log(data) });
  }
  get() {
    return this.http.get(this.URL + 'usuarios');
  }
  getTimes() {
    return this.http.get(this.URL + 'times');
  }
  getJogos() {
    return this.http.get(this.URL + 'jogos');
  }
  getUsuariosMasculino() {
    return this.http.get(this.URL + 'usuarios/findAllM');
  }
  getUsuariosFeminino() {
    return this.http.get(this.URL + 'usuarios/findAllF');
  }
  getUsuariosMasculinoId(id: number) {
    return this.http.get(this.URL + 'usuarios/findAllM/'+ id );
  }
  getUsuariosFemininoId(id: number) {
    return this.http.get(this.URL + 'usuarios/findAllF/'+ id);
  }

  getTimesMasculino() {
    return this.http.get(this.URL + 'times/findAllM');
  }
  getTimesFeminino() {
    return this.http.get(this.URL + 'times/findAllF');
  }
  getGolsPorTimeAndJogo(valor, time) {      
    return this.http.get(this.URL + 'eventos/findAllGols/' + valor + '/' + time);
  }
  getGolsPorTimeAndJogoAndJogador(valor, time, jogador) {      
    return this.http.get(this.URL + 'eventos/findAllGols/' + valor + '/' + time + '/' + jogador);
  }
  getCartaoAmareloPorTimeAndJogoAndJogador(valor, time, jogador) {      
    return this.http.get(this.URL + 'eventos/findAllCA/' + valor + '/' + time + '/' + jogador);
  }
  getCartaoVermelhoPorTimeAndJogoAndJogador(valor, time, jogador) {      
    return this.http.get(this.URL + 'eventos/findAllCV/' + valor + '/' + time + '/' + jogador);
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
            this.Alerta("Time cadastrado com sucesso! <br><br>" + "Id: " + result.id + "<br>Nome: " + result.nome);
            this.router.navigate(['/times']);
          }
          resolve(result.data);
        },
          (error) => {
            if (error.name == "HttpErrorResponse" && error.statusText != "OK") {
              this.Alerta("Verifique sua conexão! <br><br>" + error.statusText + "<br>" + error.url);
            } else {
              this.Alerta(error.message);
            }
          })
    });

  }
  cadastarTimeOk(time: any) {
    return new Promise((resolve, reject) => {
      var data = time;
      this.http.post(this.URL + 'times/createTimeOk', data)
        .subscribe((result: any) => {
          console.log(result);
          resolve(result.data);
        },
          (error) => {
            console.log(error.error.text);
            if (error.error.text != "OK") {
              this.Alerta(error.error.text);
            }
            if (error.error.text == "OK") {
              this.cadastarTime(time);
              
            }
          })
    });
  }

  cadastarJogo(jogo: any) {
    console.log(jogo);
    return new Promise((resolve, reject) => {
      var data = jogo;
      let mensagens = "";
      this.http.post(this.URL + 'jogos/createJogo', data)
        .subscribe((result: any) => {
          console.log(result);
          if (result.id != null) {
            this.Alerta("Jogo cadastrado com sucesso! <br><br>" + "Id: " + result.id 
            + "<br>Time A: " + result.timeA + "<br>Time B: " + result.timeB);
            this.router.navigate(['/jogos']);
          }
          resolve(result.data);
        },
          (error) => {
            if (error.name == "HttpErrorResponse" && error.statusText != "OK") {
              this.Alerta("Verifique sua conexão! <br><br>" + error.statusText + "<br>" + error.url);
            } else {
              this.Alerta(error.message);
            }
          })
    });

  }

  cadastarEventos(eventos: any) {
    console.log(eventos);
    return new Promise((resolve, reject) => {
      var data = eventos;
      let mensagens = "";
      this.http.post(this.URL + 'eventos/createEventos', data)
        .subscribe((result: any) => {
          console.log(result);
          if (result.id != null) {
            this.Alerta(result.tipo + " registrado com sucesso! <br><br>" + "Id: " + result.id);
           // this.router.navigate(['/jogos']);
          }
          resolve(result.data);
        },
          (error) => {
            if (error.name == "HttpErrorResponse" && error.statusText != "OK") {
              this.Alerta("Verifique sua conexão! <br><br>" + error.statusText + "<br>" + error.url);
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
            this.Alerta("Usuário alterado com sucesso! <br><br>" + "Id: " + result.id + "<br>Nome: " + result.nome);
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

  alterarTime(time: any) {
    console.log(time);
    return new Promise((resolve, reject) => {
      var data = time;
      let mensagens = "";
      this.http.post(this.URL + 'times/updateTime', data)
        .subscribe((result: any) => {
          console.log(result);
          if (result.id != null) {
            this.Alerta("Time alterado com sucesso! <br><br>" + "Id: " + result.id + "<br>Nome: " + result.nome);
            this.router.navigate(['/times']);
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

  alterarJogo(jogo: any) {
    console.log(jogo);
    return new Promise((resolve, reject) => {
      var data = jogo;
      let mensagens = "";
      this.http.post(this.URL + 'jogos/updateJogo', data)
        .subscribe((result: any) => {
          console.log(result);
          if (result.id != null) {
            this.Alerta("Jogo alterado com sucesso! <br><br>" + "Id: " + result.id 
            + "<br>Time A: " + result.timeA + "<br>Time B: " + result.timeB);
            this.router.navigate(['/jogos']);
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


  alterarTimeOk(time: any) {
    return new Promise((resolve, reject) => {
      var data = time;
      this.http.post(this.URL + 'times/updateTimeOk', data)
        .subscribe((result: any) => {
          console.log(result);
          resolve(result.data);
        },
          (error) => {
            console.log(error.error.text);
            console.log(error);
            console.log(error.error);
            if (error.error.text != "OK") {
              this.Alerta(error.error.text);
            }
            if (error.error.text == "OK") {
              this.alterarTime(time);
              this.router.navigate(['/times']);
            }
          })
    });
  }

  detalharUsuario(id: string) {
    return this.http.get(this.URL + 'usuarios/' + id);
  }
  detalharTime(id: string) {
    return this.http.get(this.URL + 'times/' + id);
  }
  detalharTimeNomeM(id: string) {
    return this.http.get(this.URL + 'times/nomeM/' + id);
  }
  detalharTimeNomeF(id: string) {
    return this.http.get(this.URL + 'times/nomeF/' + id);
  }

  detalharJogo(id: string) {
    return this.http.get(this.URL + 'jogos/' + id);
  }

  pegarTime(id: string) {
    return new Promise((resolve, reject) => {
      this.http.get(this.URL + 'times/' + id)
        .subscribe((result: any) => {
          this.usuario = result;
          console.log(result);
          console.log(this.usuario);
          resolve(result.data);
          console.log(result.data);
        })
    });

  }

  excluirUsuario(id: number) {
    return new Promise((resolve, reject) => {
      var data = {
        id: id
      };
      console.log(data);
      this.http.post(this.URL + 'usuarios/deleteUsuario', id)
        .subscribe((result: any) => {
          this.Alerta(result);
          console.log(result);
          resolve(result.json());
        },
          (error) => {
            console.log(error.error); // error message as string
            if (error.error.text != "OK") {
              this.Alerta(error.error.text);
            }
            if (error.error.text == "OK") {
              this.Alerta("Usuário excluído com sucesso!!!");
            }
            reject(error)
          })
    });
  }

  excluirTime(id: number) {
    return new Promise((resolve, reject) => {
      var data = {
        id: id
      };
      console.log(data);
      this.http.post(this.URL + 'times/deleteTime', id)
        .subscribe((result: any) => {
          
          if (result == null) {
            this.Alerta("Time excluído com sucesso!!!");
            this.router.navigate(['/times']);
          } else {
            this.Alerta("Erro ao tentar excluir o Time!!!");
          }

        },
          (error) => {
            console.log(error.error); // error message as string
            if (error.error.text != "OK") {
              this.Alerta(error.error.text);
            }
            if (error.error.text == "OK") {
              this.Alerta("Usuário excluído com sucesso!!!");
            }
          })
    });
  }
  excluirJogo(id: number) {
    return new Promise((resolve, reject) => {
      var data = {
        id: id
      };
      console.log(data);
      this.http.post(this.URL + 'jogos/deleteJogo', id)
        .subscribe((result: any) => {
          
          if (result == null) {
            this.Alerta("Jogo excluído com sucesso!!!");
            this.router.navigate(['/jogos']);
          } else {
            this.Alerta("Erro ao tentar excluir o Jogo!!!");
          }

        },
          (error) => {
            this.Alerta(error.error.text); // error message as string
            //reject(error)
          })
    });
  }

}
