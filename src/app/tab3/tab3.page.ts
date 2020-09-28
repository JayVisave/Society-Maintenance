import { Component } from '@angular/core';
import { Noc } from '../models/noc.model';
import { User } from '../models/user.model';
import { ToastController, LoadingController, NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { get, GlobalService } from '../global.service';


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

  async request_noc(user: User){
    if(this.formValidation()){
      let loader = this.loadingCtrl.create({
         message: "Please wait..."
       });
       (await loader).present();
       try{
        this.generationDate = Date.now().toString();
        GlobalService.userId = await get("userId");
        console.log("Global "+  GlobalService.userId);
        this.fireStore.collection("userDetails").doc(GlobalService.userId).collection("NOC").doc(this.generationDate).set({...this.noc});
        this.showToast("Your request for NOC has been sent to the office.");
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
    if(!this.noc.name){
      this.showToast("Provide name of the new owner.");
      return false;
    }

    return true;
  }

  showToast(message: string){
    this.toastCtrl.create({message: message,duration:3000,}).then(toastData => toastData.present());
  }

}
