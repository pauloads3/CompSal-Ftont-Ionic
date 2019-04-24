import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'categorias',
   loadChildren: './categorias/categorias.module#CategoriasPageModule' },
  { path: 'cadastrar-arbitro', loadChildren: './cadastrar-arbitro/cadastrar-arbitro.module#CadastrarArbitroPageModule' },
  { path: 'usuarios', loadChildren: './usuarios/usuarios.module#UsuariosPageModule' },
  { path: 'cadastrar-usuario', loadChildren: './cadastrar-usuario/cadastrar-usuario.module#CadastrarUsuarioPageModule' },
  { path: 'cadastrar-usuario/:id', loadChildren: './cadastrar-usuario/cadastrar-usuario.module#CadastrarUsuarioPageModule' },
  { path: 'detalhar-usuario/:id', loadChildren: './detalhar-usuario/detalhar-usuario.module#DetalharUsuarioPageModule' }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
