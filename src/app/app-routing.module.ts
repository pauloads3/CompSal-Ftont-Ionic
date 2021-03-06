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
  { path: 'cadastrarUsuario', loadChildren: './cadastrar-usuario/cadastrar-usuario.module#CadastrarUsuarioPageModule' },
  { path: 'alterarUsuario/:id', loadChildren: './cadastrar-usuario/cadastrar-usuario.module#CadastrarUsuarioPageModule' },
  { path: 'detalharUsuario/:id', loadChildren: './detalhar-usuario/detalhar-usuario.module#DetalharUsuarioPageModule' },
  { path: 'usuarios/detalhar/:id', loadChildren: './usuarios/detalhar/detalhar.module#DetalharPageModule' },
  { path: 'usuarios/alterar/:id', loadChildren: './usuarios/alterar/alterar.module#AlterarPageModule' },
  { path: 'times', loadChildren: './times/times.module#TimesPageModule' },
  { path: 'times/alterar/:id', loadChildren: './times/alterar/alterar.module#AlterarPageModule' },
  { path: 'times/detalhar/:id', loadChildren: './times/detalhar/detalhar.module#DetalharPageModule' },
  { path: 'times/cadastrar', loadChildren: './times/cadastrar/cadastrar.module#CadastrarPageModule' },
  { path: 'jogos', loadChildren: './jogos/jogos.module#JogosPageModule' },
  { path: 'jogos/alterar/:id', loadChildren: './jogos/alterar/alterar.module#AlterarPageModule' },
  { path: 'jogos/cadastrar', loadChildren: './jogos/cadastrar/cadastrar.module#CadastrarPageModule' },
  { path: 'jogos/detalhar/:id', loadChildren: './jogos/detalhar/detalhar.module#DetalharPageModule' },
  { path: 'detalhar-jogo/:id', loadChildren: './detalhar-jogo/detalhar-jogo.module#DetalharJogoPageModule' },
  { path: 'sumulas', loadChildren: './sumulas/sumulas.module#SumulasPageModule' },
  { path: 'sumulas/detalhar', loadChildren: './sumulas/detalhar/detalhar.module#DetalharPageModule' },
  { path: 'sumulas/cadastrar/:id', loadChildren: './sumulas/cadastrar/cadastrar.module#CadastrarPageModule' },
  { path: 'sumulas/alterar', loadChildren: './sumulas/alterar/alterar.module#AlterarPageModule' }
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
