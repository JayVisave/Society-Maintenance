import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { ToastController, LoadingController, NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user = {} as User;
  constructor(
    private toastCtrl: ToastController, 
    private loadingCtrl : LoadingController,
    private afAuth : AngularFireAuth,
    private navCtrl : NavController
    ) { }

  ngOnInit() {
  }
  async register(user: User){
     if(this.formValidation()){
       let loader = this.loadingCtrl.create({
          message: "Please wait..."
        });
        (await loader).present();
        try{
          await this.afAuth
          .createUserWithEmailAndPassword(user.email, user.password)
          .then(data => {
            console.log(data);
            this.navCtrl.navigateRoot('/tabs');
          });
          
        }
        catch(e){
          this.showToast(e);
        }
        (await loader).dismiss();
     }
  }
  formValidation(){
    if(!this.user.email){
      this.showToast("Enter registered e-mail.");
      return false;
    }
    if(!this.user.password){
      this.showToast("Enter valid password.");
      return false;
    }
    return true;
  }
  showToast(message: string){
    this.toastCtrl.create({message: message,duration:3000,}).then(toastData => toastData.present());
  }
}
