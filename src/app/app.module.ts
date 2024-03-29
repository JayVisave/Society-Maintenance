import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import {HttpClientModule} from '@angular/common/http';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocketIoModule, SocketIoConfig} from 'ngx-socket-io';
const config: SocketIoConfig = { url: 'http://localhost:3001',options: { transports: ['websocket', 'polling', 'flashsocket'] }};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp(environment.FIREBASE_CONFIG)
    ,AngularFireAuthModule, AngularFirestoreModule,HttpClientModule,AngularFireStorageModule,
    SocketIoModule.forRoot(config),
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    FileOpener,
    InAppBrowser,Camera

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
