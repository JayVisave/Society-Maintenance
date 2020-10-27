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
  societyNames : any;
  public societyName : string;
  societyID : string;
  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private fireStore: AngularFirestore,

     ) {}

  ngOnInit() {
    // tslint:disable-next-line: deprecation
   // this.getUserDetails(event);
    this.getSocietyDetails(event);
  }
  async getSocietyDetails(event){
    const loader = this.loadingCtrl.create({
      message: 'Please wait...'
    });
    (await loader).present();
    try{
    this.fireStore.collection('society').snapshotChanges().subscribe(data => {
      this.societyNames = data.map(e=>{
        
        return{
          name: e.payload.doc.data()['name'],
          wings: e.payload.doc.data()['wings'],
          flats: e.payload.doc.data()['flatsPerWing'],
          id: e.payload.doc.data()['id']
        }
      })
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
  async deleteUser(user: any, tempID: any){

      const loader = this.loadingCtrl.create({
        message: 'Please wait...'
      });
      (await loader).present();
      try{
        this.fireStore.collection('userDetails').doc(user.id).delete();
        this.fireStore.collection("society").doc(tempID).collection('users').doc(user.id).delete().then(function() {
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
  async getUserDetails(tempID : any){
    const loader = this.loadingCtrl.create({
      message: 'Please wait...'
    });
    (await loader).present();
    try{


      // var day = generationDate.getDay();
      GlobalService.userId = await get('userId');
      console.log('Global ' +  GlobalService.userId);


      this.fireStore.collection('society').doc(tempID).collection('users').snapshotChanges().subscribe( data => {
    this.users = data.map(e => {
     // console.log('Type ' + e.payload.doc.data()['type']);
     this.societyName = e.payload.doc.data()['societyName'];
      return{
      name: e.payload.doc.data().name,
      id: e.payload.doc.data().u_id,
      flat: e.payload.doc.data().flat,
      wing: e.payload.doc.data().wing,

    };
    });
  });
      (await loader).dismiss();
    }
    catch (e){
      this.showToast(e);
    }
    setTimeout(() => {

      
    }, 1000);

  }
  showToast(message: string){
    this.toastCtrl.create({message, duration: 3000, }).then(toastData => toastData.present());
  }
}



