import { Component } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  posts: any;

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private fireStore: AngularFirestore,
     ) {}

  ionViewWillEnter(){}

  async getPosts(){
    let loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();
    try{
      this.fireStore.collection("posts").snapshotChanges().subscribe(data => {
        this.posts = data.map(e => {
          return{
            id: e.payload.doc.id,
            title: e.payload.doc.data()["title"],
            details: e.payload.doc.data()["details"],
          }
        })
      });
    (await loader).dismiss();
    }
    catch(e){
      this.showToast(e);
    }
    
  }
  showToast(message: string){
    this.toastCtrl.create({message: message,duration:3000,}).then(toastData => toastData.present());
  }
}
