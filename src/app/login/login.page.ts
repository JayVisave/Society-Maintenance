import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { ToastController, LoadingController, NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { get, GlobalService, set } from '../global.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
user = {} as User;
  constructor(private toastCtrl: ToastController,
              private loadingCtrl: LoadingController,
              private afAuth: AngularFireAuth,
              private navCtrl: NavController,
              private fireStore: AngularFirestore,
              ) { }

  ngOnInit() {
    GlobalService.userId = get('userId');
    if (!GlobalService.userId == null){
      this.showToast('User Logged In...');
      this.navCtrl.navigateRoot('/tabs');
    }
  }
  async login(user: User){
    if (this.formValidation()){
      const loader = this.loadingCtrl.create({
        message: 'Please wait...'
      });
      (await loader).present();
      try{
        await this.afAuth.signInWithEmailAndPassword(user.email, user.password).then(data => {
          if (user.email.substring(0, 5) === 'admin'){
            set('userId', 'admin' + data.user.uid);
            this.navCtrl.navigateRoot('/tabs/admin-tab1');
          }
          else if(user.email.substring(0, 7) === 'society'){
            set("userCode",user.email.substr(7, 5));
            set('userId', 'society' + data.user.uid);
            this.navCtrl.navigateRoot('/tabs/society-admin-tab1');
          }
          else{
            set('userId', data.user.uid);
            this.navCtrl.navigateRoot('/tabs');
          }

        });

      }
      catch (e){
        this.showToast(e);
      }
      (await loader).dismiss();
    }
  }
  formValidation(){
    if (!this.user.email){
      this.showToast('Enter registered e-mail.');
      return false;
    }
    if (!this.user.password){
      this.showToast('Enter valid password.');
      return false;
    }
    return true;
  }
  showToast(message: string){
    this.toastCtrl.create({message, duration: 3000, }).then(toastData => toastData.present());
  }
}
