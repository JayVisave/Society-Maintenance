import { Component, OnInit } from '@angular/core';
import { get, GlobalService } from '../global.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController, LoadingController, NavController } from '@ionic/angular';
import { Visitor } from '@angular/compiler/src/i18n/i18n_ast';
@Component({
  selector: 'app-society-admin-tab1',
  templateUrl: './society-admin-tab1.page.html',
  styleUrls: ['./society-admin-tab1.page.scss'],
})
export class SocietyAdminTab1Page implements OnInit {
  users: any;
  visitor={} as Visitor;
  societyNames : any;
  public societyName : string;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private fireStore: AngularFirestore,
  ) { 
    
  }

  ngOnInit() {
    this.getData();
    this.getSocietyDetails(event);
    console.log("Page initialized ");
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
      flat: e.payload.doc.data().flatNumber,
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

  async visitRequest()
  {
    const loader = this.loadingCtrl.create({
      message: 'Please wait...'
    });
    (await loader).present();
    try{

    }
    catch (e){
      this.showToast(e);
    }
    setTimeout(() => {}, 1000);
  }

  

  async getData(){
    GlobalService.userId = await get('userId');
    console.log("ID ",GlobalService.userId);
    GlobalService.userCode = await get('userCode');
    console.log("CODE ",GlobalService.userCode);

  }
  //GlobalService.userId = await get('userId'); # Society Admin id
  //GlobalService.userCode = await get('userCode');  # Society Code for accessing society
  //this.fireStore.firestore.collection('societyCodes').doc(GlobalService.userCode).get().then(doc => {}); # get society id
  showToast(message: string){
    this.toastCtrl.create({message, duration: 3000, }).then(toastData => toastData.present());
  }
}
