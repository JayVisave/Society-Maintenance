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
  societyNames : any;

  public indexesWing: any = [];
  public indexesFlat: any = [];
  public tempSocietyName: string;
  public flats: string;
  possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private fireStore: AngularFirestore,
    ) { }

  async ngOnInit() {
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
  async fetchWings(tempID : any){
    console.log("index  "+tempID);
    const loader = this.loadingCtrl.create({
      message: 'Please wait...'
    });
    (await loader).present();
    try{
    this.fireStore.firestore.collection('society').doc(tempID).get().then(data => {
      this.indexesWing= [];
      this.tempSocietyName = data.data()['name'];
      this.flats = data.data()['flatsPerWing'];
      // console.log("runs  ");
      for(let i =0;i< parseInt(data.data()['wings']);i++){
        console.log("index "+i);
        this.indexesWing.push(i);


      }
    });
    (await loader).dismiss();
  }
  catch (e){
    this.showToast(e);
  }

  }
  async fetchFlats(tempID : any){
    console.log("index  "+tempID);
    const loader = this.loadingCtrl.create({
      message: 'Please wait...'
    });
    (await loader).present();
    try{
      this.indexesFlat= [];
      // console.log("runs  ");
      for(let i =0;i< parseInt(this.flats);i++){
        console.log("index  "+i);
        this.indexesFlat.push(i+1);
        
      }

    (await loader).dismiss();
  }
  catch (e){
    this.showToast(e);
  }

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
            else if(user.email.substring(0, 7) === 'society'){
              set("userCode",user.email.substr(7, 5));
              set('userId', 'society' + data.user.uid);
            }
            else{
              set('userId', data.user.uid);
              
            }
            this.userDetails.no_of_comp = 0;
            this.userDetails.no_of_noc =0;
            this.userDetails.societyName = this.tempSocietyName;
            this.userDetails.u_id = data.user.uid;
            this.fireStore.collection('userDetails').doc(data.user.uid).set({...userDetails});
            // this.societyUser.name= userDetails.name;
            // this.societyUser.u_id = data.user.uid;
            // this.societyUser.flat = userDetails.flatNumber;
            // this.societyUser.wing = userDetails.wing;
           
            this.fireStore.collection('society').doc(userDetails.societyID).collection('users').doc(data.user.uid).set({...userDetails});
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
