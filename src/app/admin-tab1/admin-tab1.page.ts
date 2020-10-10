import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { get, GlobalService } from '../global.service';



@Component({
  selector: 'app-admin-tab1',
  templateUrl: './admin-tab1.page.html',
  styleUrls: ['./admin-tab1.page.scss'],
})
export class AdminTab1Page implements OnInit {
  users: any;
  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private fireStore: AngularFirestore,

     ) {}

  ngOnInit() {
    // tslint:disable-next-line: deprecation
    this.getUserDetails(event);
  }
  
  async deleteUser(user: any){

      const loader = this.loadingCtrl.create({
        message: 'Please wait...'
      });
      (await loader).present();
      try{
        this.fireStore.collection('userDetails').doc(user.id).delete();
        this.fireStore.collection("society").doc('sFxpx7WgYy9ojV4pzgvJ').collection('users').doc(user.id).delete().then(function() {
          console.log("Document successfully deleted!");
      }).catch(function(error) {
          console.error("Error removing document: ", error);
      });
        
      }
      catch (e){
        this.showToast(e);
      }
      (await loader).dismiss();

  }
  async getUserDetails(event){
    const loader = this.loadingCtrl.create({
      message: 'Please wait...'
    });
    (await loader).present();
    try{


      // var day = generationDate.getDay();
      GlobalService.userId = await get('userId');
      console.log('Global ' +  GlobalService.userId);


      this.fireStore.collection('society').doc('sFxpx7WgYy9ojV4pzgvJ').collection('users').snapshotChanges().subscribe( data => {
    this.users = data.map(e => {
     // console.log('Type ' + e.payload.doc.data()['type']);
      return{
      name: e.payload.doc.data().name,
      id: e.payload.doc.data().u_id,

    };
    });
  });
      (await loader).dismiss();
    }
    catch (e){
      this.showToast(e);
    }
    setTimeout(() => {

      event.target.complete();
    }, 1000);

  }
  showToast(message: string){
    this.toastCtrl.create({message, duration: 3000, }).then(toastData => toastData.present());
  }
}



