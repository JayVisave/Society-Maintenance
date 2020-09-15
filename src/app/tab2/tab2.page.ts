import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { ToastController, LoadingController, NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserDetails } from '../models/userDetails.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { set } from '../global.service';
import { Complaint } from '../models/complaint.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  user = {} as User;
  complaint = {} as Complaint;
  constructor(
    private toastCtrl: ToastController, 
    private loadingCtrl : LoadingController,
    private afAuth : AngularFireAuth,
    private navCtrl : NavController,
    private fireStore : AngularFirestore,
  ) {}
  ngOnInit() {
    
  }

  async file_Complaint(user: User,userDetails: UserDetails){
    if(this.formValidation()){
      let loader = this.loadingCtrl.create({
         message: "Please wait..."
       });
       (await loader).present();
       try{
         
       }
       finally{}
      }
  }
  formValidation(){
    if(!this.user.email){
      this.showToast("Enter Valid E-mail.");
      return false;
    }
    if(!this.user.password){
      this.showToast("Enter Valid Password.");
      return false;
    }
    if(!this.complaint.name){
      this.showToast("Enter Full Name.");
      return false;
    }
    if(!this.complaint.society){
      this.showToast("Select Resident Society.");
      return false;
    }
    if(!this.complaint.comp_type){
      this.showToast("Select Category of Ownership.");
      return false;
    }
    if(!this.complaint.issue){
      this.showToast("Select Type of Ownership.");
      return false;
    }

    return true;
  }
  showToast(message: string){
    this.toastCtrl.create({message: message,duration:3000,}).then(toastData => toastData.present());
  }
}
