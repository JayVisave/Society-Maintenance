import { Component, OnInit } from '@angular/core';

import { get, GlobalService } from '../global.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { ToastController, LoadingController, NavController } from '@ionic/angular';
import { Visitor } from '../models/visitor.model';
import { File, FileEntry } from '@ionic-native/file';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-tab-visitor',
  templateUrl: './tab-visitor.page.html',
  styleUrls: ['./tab-visitor.page.scss'],
})
export class TabVisitorPage implements OnInit {

  visitors: any;
  downloadUrl: Observable<string | null>;
  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private fireStore: AngularFirestore,
    private storage: AngularFireStorage,) 
    { 
  }

  ngOnInit() {
    this.getVisitors(event);
  }

  async getVisitors(event)
  {
    let loader = this.loadingCtrl.create({
      message: 'Please wait...'
    });
    (await loader).present();
    try{
      GlobalService.userId = await get('userId');
      GlobalService.societyId = await get('societyID');
      console.log('Global '+  GlobalService.userId);
      console.log('Global '+  GlobalService.societyId);
      this.fireStore.collection('userDetails').doc(GlobalService.userId).collection('visitors').snapshotChanges().subscribe( data=>{
        this.visitors = data.map(e=>{
         console.log('Type '+e.payload.doc.data()['f_id']);
         if (e.payload.doc.data()['f_id'] != 'none') {
          // const loc = e.payload.doc.data()['f_id'].toString();
          const ref = this.storage.ref('VisitorPhotos/U9labJQbO2HsceqUutmt.jpg');
          console.log('ref ', ref);
          this.downloadUrl = ref.getDownloadURL();
         }
         return{
           name: e.payload.doc.data()['name'],
           phone: e.payload.doc.data()['phone'],
           reason: e.payload.doc.data()['reason'],
           d_url: this.downloadUrl,
         }
       })
      })
    }
    catch(e)
     {
       this.showToast(e);
     }
    (await loader).dismiss();
    setTimeout(() => {

      event.target.complete();
    }, 1000);
  }
  showToast(message: string){
    this.toastCtrl.create({message: message,duration:3000,}).then(toastData => toastData.present());
  }
}
