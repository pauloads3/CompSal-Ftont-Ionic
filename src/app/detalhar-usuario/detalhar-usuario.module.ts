import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetalharUsuarioPage } from './detalhar-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: DetalharUsuarioPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DetalharUsuarioPage]
})
export class DetalharUsuarioPageModule {}
