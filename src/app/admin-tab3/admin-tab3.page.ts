import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController, NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { set } from '../global.service';
import { Society } from '../models/Society.model';
import { SocietyCode } from '../models/SocietyCode.model';
@Component({
  selector: 'app-admin-tab3',
  templateUrl: './admin-tab3.page.html',
  styleUrls: ['./admin-tab3.page.scss'],
})
export class AdminTab3Page implements OnInit {
  society = {} as Society;
  societyCode = {} as SocietyCode;
  id: string;
  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private fireStore: AngularFirestore,
  ) { }

  ngOnInit() {
  }
  
  async register(society: Society){
    if (this.formValidation()){
      const loader = this.loadingCtrl.create({
         message: 'Please wait...'
       });
      (await loader).present();
      try{
        this.id =this.fireStore.createId();
        this.society.id = this.id;
        this.societyCode.id = this.id;
        var genCode = this.makeid();
        this.fireStore.collection('societyCodes').doc(genCode).set({...this.societyCode});
        this.fireStore.collection('society').doc(this.id).set({...this.society});
        this.showToast("Society : "+ this.society.name +" created successfully.");
        

      }
       catch (e){
         console.log(e);
         this.showToast(e);

       }
      (await loader).dismiss();

    }
 }
 makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
 formValidation(){
   if (!this.society.name){
     this.showToast('Enter Valid Society Name.');
     return false;
   }
   if (!this.society.commercial){
     this.showToast('Enter Valid Commercial Amount.');
     return false;
   }
   if (!this.society.complaint){
     this.showToast('Enter Valid Complaint Amount.');
     return false;
   }
   if (!this.society.event){
     this.showToast('Enter Valid Event Amount.');
     return false;
   }
   if (!this.society.interest){
     this.showToast('Enter Valid Interest Amount.');
     return false;
   }
   if (!this.society.noc){
     this.showToast('Enter Valid NOC Amount.');
     return false;
   }

   if (!this.society.owner){
     this.showToast('Enter Valid Owner Amount.');
     return false;
   }
   if (!this.society.parking){
    this.showToast('Enter Valid Parking Amount.');
    return false;
  }
  if (!this.society.structure){
    this.showToast('Enter Valid Structure Amount.');
    return false;
  }
  if (!this.society.tenant){
    this.showToast('Enter Valid Tenant Amount.');
    return false;
  }
  if (!this.society.water){
    this.showToast('Enter Valid Water Amount.');
    return false;
  }
  if (!this.society.flatsPerWing){
    this.showToast('Enter Valid Flats Per Wing Amount.');
    return false;
  }
  if (!this.society.wings){
    this.showToast('Enter Valid Wing Amount.');
    return false;
  }

   return true;
 }
 showToast(message: string){
   this.toastCtrl.create({message, duration: 3000, }).then(toastData => toastData.present());
 }
}
