import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { CompsalService } from '../compsal.service';

@Component({
  selector: 'app-times',
  templateUrl: './times.page.html',
  styleUrls: ['./times.page.scss'],
})
export class TimesPage implements OnInit {
  
  
  lista_categorias = [{id:1, nome:'Paulo'},{id:2, nome:'Roberto'},{id:3, nome:'Vivianne'}];

  constructor(
    private navController: NavController,
    
  ) { }

  ngOnInit() {
    
  }

  
  detalharTime(id: string){
    this.navController.navigateForward(['/times/detalhar', id]);
    
  }
  alterarTime(id: string){
    this.navController.navigateForward(['/times/alterar', id]);
    
  }


}
