import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CategoriasPage } from './categorias.page';

import { BrMaskerModule } from 'br-mask';

const routes: Routes = [
  {
    path: '',
    component: CategoriasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    BrMaskerModule
  ],
  
  declarations: [CategoriasPage]
})
export class CategoriasPageModule {}
