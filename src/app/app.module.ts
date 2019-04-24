import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { BrMaskerModule } from 'br-mask';
//import { Ionic4MaskDirective } from 'ionic4-mask-directive';
//import { InputMaskModule } from 'ionic-input-mask';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [ 
    BrowserModule,
    IonicModule.forRoot(), 
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrMaskerModule
    //InputMaskModule 
    
  ],
  providers: [
    StatusBar,
    SplashScreen, 
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

