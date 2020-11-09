import { Component } from '@angular/core';
import { Noc } from '../models/noc.model';
import { User } from '../models/user.model';
import { ToastController, LoadingController, NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { get, GlobalService } from '../global.service';
import * as firebase from 'firebase';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  generationDate: string;
  nocs: any;
  user = {} as User;
  noc = {} as Noc;
  public NOCRef: any;
  userDetails : any;
  constructor(
    private toastCtrl: ToastController, 
    private loadingCtrl : LoadingController,
    private fireStore : AngularFirestore,
  ) {
    this.getRequestedNOC(event);
  }

  async getRequestedNOC(event){
    let loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();
    try{
      GlobalService.userId = await get("userId");
      this.fireStore.collection("userDetails").doc(GlobalService.userId).collection("NOC").snapshotChanges().subscribe( data=>{
         this.nocs = data.map(e=>{
          console.log("Type "+e.payload.doc.data()["type"]);
          return{
            noc_type: e.payload.doc.data()["noc_type"],
            name: e.payload.doc.data()["name"],
            isSolved: e.payload.doc.data()["isSolved"],
          }
        })
       })
     }
     catch(e)
     {
       this.showToast(e);
     }
    (await loader).dismiss();
  }

  async request_noc(noc: Noc){
    if(this.formValidation()){
      let loader = this.loadingCtrl.create({
         message: "Please wait..."
       });
       (await loader).present();
       try{
        this.generationDate = Date.now().toString();
        GlobalService.userId = await get("userId");
        GlobalService.societyId = await get("societyID");
        this.NOCRef = this.fireStore.createId();
        console.log("Global "+  GlobalService.userId);
        this.noc.n_id = this.NOCRef;
        this.noc.u_id = GlobalService.userId;
        this.fireStore.firestore.collection('userDetails').doc(GlobalService.userId).get().then(doc=>{
          this.userDetails =  [doc.data()].map(e => {
            return{
              name: e['name'],
              flat: e['flatNumber'],
              wing: e['wing'],
  
            };
          });
        
        this.noc.uname= this.userDetails[0]['name'];
        this.noc.wing= this.userDetails[0]['wing'];
        this.noc.flat= this.userDetails[0]['flat'];
        this.noc.isSolved = "Unsolved";
        this.fireStore.collection("userDetails").doc(GlobalService.userId).collection("NOC").doc(this.NOCRef).set({...this.noc});
        this.fireStore.collection("society").doc(GlobalService.societyId).collection("NOC").doc(this.NOCRef).set({...this.noc});
        const increment = firebase.firestore.FieldValue.increment(1);
        this.fireStore.collection('userDetails').doc(GlobalService.userId).update({"no_of_noc": increment});
        this.showToast("Your request for NOC has been sent to the office.");
        });
        
      }
      catch(e)
      {
      console.log(e);
      this.showToast(e);
      }
      (await loader).dismiss();
    }
  }
  formValidation(){
    if(!this.noc.noc_type){
      this.showToast("Select Category of NOC request.");
      return false;
    }

    return true;
  }

  showToast(message: string){
    this.toastCtrl.create({message: message,duration:3000,}).then(toastData => toastData.present());
  }

}
