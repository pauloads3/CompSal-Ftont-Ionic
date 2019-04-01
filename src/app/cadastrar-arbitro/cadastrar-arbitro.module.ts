import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CadastrarArbitroPage } from './cadastrar-arbitro.page';

const routes: Routes = [
  {
    path: '',
    component: CadastrarArbitroPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CadastrarArbitroPage]
})
export class CadastrarArbitroPageModule {}
