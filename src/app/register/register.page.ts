import { SocietyUser } from './../models/societyUser.model';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { ToastController, LoadingController, NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserDetails } from '../models/userDetails.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { set } from '../global.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {

  user = {} as User;
  userDetails = {} as UserDetails;
  societyUser = {} as SocietyUser;
  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private fireStore: AngularFirestore,
    ) { }

  ngOnInit() {

  }
  async register(user: User, userDetails: UserDetails){
     if (this.formValidation()){
       const loader = this.loadingCtrl.create({
          message: 'Please wait...'
        });
       (await loader).present();
       try{
         
        await this.afAuth
          .createUserWithEmailAndPassword(user.email, user.password)
          .then(data => {
            console.log();
            if (user.email.substring(0, 5) === 'admin'){
              set('userId', 'admin' + data.user.uid);
            }
            else{
              set('userId', data.user.uid);
            }
            this.fireStore.collection('userDetails').doc(data.user.uid).set({...userDetails});
            this.societyUser.name= userDetails.name;
            this.societyUser.u_id = data.user.uid;
            this.societyUser.flat = userDetails.flatNumber;
            this.societyUser.wing = userDetails.wing;
            this.fireStore.collection('society').doc('sFxpx7WgYy9ojV4pzgvJ').collection('users').doc(data.user.uid).set({...this.societyUser});
          });
        await this.afAuth
          .signInWithEmailAndPassword(user.email, user.password)
          .then(data => {
            console.log(data);
            if (user.email.substring(0, 5) === 'admin'){
              this.navCtrl.navigateRoot('/tabs/admin-tab1');
            }
            else{
            this.navCtrl.navigateRoot('/tabs');
            }

          });
        }
        catch (e){
          console.log(e);
          this.showToast(e);

        }
       (await loader).dismiss();

     }
  }
  formValidation(){
    if (!this.user.email){
      this.showToast('Enter Valid E-mail.');
      return false;
    }
    if (!this.user.password){
      this.showToast('Enter Valid Password.');
      return false;
    }
    if (!this.userDetails.name){
      this.showToast('Enter Full Name.');
      return false;
    }
    if (!this.userDetails.societyName){
      this.showToast('Select Resident Society.');
      return false;
    }
    if (!this.userDetails.isCommercial){
      this.showToast('Select Category of Ownership.');
      return false;
    }
    if (!this.userDetails.isOwner){
      this.showToast('Select Type of Ownership.');
      return false;
    }

    if (!this.userDetails.parkingVehicles){
      this.showToast('Select Number of Parking Vehicles.');
      return false;
    }

    return true;
  }
  showToast(message: string){
    this.toastCtrl.create({message, duration: 3000, }).then(toastData => toastData.present());
  }
}
