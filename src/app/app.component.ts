import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Campeonatos',
      url: '/Campeonatos',
      icon: 'shirt'
    },
    {
      title: 'Sumulas',
      url: '/Sumulas',
      icon: 'clipboard'
    },
    {
      title: 'Usuarios',
      url: '/usuarios',
      icon: 'people'
    },
    {
      title: 'Equipes',
      url: '/Equipes',
      icon: 'happy'
    },
    {
      title: 'Categorias',
      url: '/categorias',
      icon: 'body'
    },
    {
      title: 'Estatísticas',
      url: '/Estatísticas',
      icon: 'stats'
    },
    {
      title: 'Conta',
      url: '/Conta',
      icon: 'contact'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
