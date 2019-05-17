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
  time: any;
  
  constructor(private activatedRoute: ActivatedRoute, private compsalService: CompsalService) { }

  ngOnInit() {
    this.idUsuario = this.activatedRoute.snapshot.paramMap.get('id');
    
    //this.usuario = this.compsalService.detalharUsuario(this.idUsuario);
    console.log("antes usuario");
    var usu:any;
    console.log("antes usu!!");
    console.log(usu);
    this.compsalService.detalharTime(this.idUsuario).subscribe((result: any) => {
      this.time = result;
      //resolve(result.json());
      console.log(this.time);
      console.log("!!!!!!!!!!");
    });
    console.log("antes usu");
    console.log(usu);
    
  
  }

}
