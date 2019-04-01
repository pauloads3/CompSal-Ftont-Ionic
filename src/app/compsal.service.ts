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
    return this.http.get(this.URL + "arbitros");

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
  cadastarArbitro(id: number, nome: string, funcao: string ){
    return new Promise((resolve, reject) =>{
      var data ={
        id: id,
        nome: nome,
        funcao: funcao
              };
      console.log(data);
      this.http.post("http://localhost:8080/arbitros/createArbitro", data)
      .subscribe((result: any) => {
        resolve (result.json());
        console.log(data);
      },
      (error)=>{
        reject(error.json())
      })
    });
  }

}
