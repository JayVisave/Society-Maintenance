import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { ToastController, LoadingController, NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { get, GlobalService } from '../global.service';
import { Complaint } from '../models/complaint.model';
import * as firebase from 'firebase';
import { societyComplaint } from '../models/societyComplaint';
import { UserDetails } from '../models/userDetails.model';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  compe_type: any;
  issue: any;
  generationDate: string;
  complaints: any;
  name: string;
  flat: any;
  wing: string;

  user = {} as User;
  complaint = {} as Complaint;
  societyComplaint = {} as societyComplaint;
  userDetails : any;
  constructor(
    private toastCtrl: ToastController, 
    private loadingCtrl : LoadingController,
    private fireStore : AngularFirestore,
  ) {}
  ngOnInit() {
    this.getComplaints(event);
  }

  async getComplaints(event){
    let loader = this.loadingCtrl.create({
      message: 'Please wait...'
    });
    (await loader).present();
    try{
      GlobalService.userId = await get('userId');
      GlobalService.societyId = await get('societyID');
      console.log('Global '+  GlobalService.userId);
      console.log('Global '+  GlobalService.societyId);
      this.fireStore.collection('userDetails').doc(GlobalService.userId).collection('Complaint').snapshotChanges().subscribe( data=>{
         this.complaints = data.map(e=>{
          console.log('Type '+e.payload.doc.data()['type']);
          return{
            comp_type: e.payload.doc.data()['comp_type'],
            issue: e.payload.doc.data()['issue'],
            isSolved: e.payload.doc.data()['isSolved'],
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

  async file_Complaint(user: User){
    if(this.formValidation()){
      let loader = this.loadingCtrl.create({
         message: 'Please wait...'
       });
       (await loader).present();
       try{
        this.generationDate = Date.now().toString();
        GlobalService.userId = await get('userId');
        GlobalService.societyId = await get('societyID');
        console.log('Global 1'+  GlobalService.userId);
        console.log('Global 1'+  GlobalService.societyId);
        this.fireStore.firestore.collection('userDetails').doc(GlobalService.userId).get()
      .then(doc => {
        this.userDetails =  [doc.data()].map(e => {
          return{
            name: e['name'],
            flat: e['flatNumber'],
            wing: e['wing'],

          };
       
        });

        this.complaint.u_id = GlobalService.userId;
        this.complaint.c_id = this.fireStore.createId();
        this.complaint.isSolved = "Unsolved";
        this.societyComplaint.name = this.userDetails[0]['name'];
        this.societyComplaint.flat = this.userDetails[0]['flat'];
        this.societyComplaint.wing = this.userDetails[0]['wing'];
        this.societyComplaint.comp_type = this.complaint.comp_type;
        this.societyComplaint.issue = this.complaint.issue;
        this.societyComplaint.isSolved = this.complaint.isSolved;
        this.societyComplaint.u_id = GlobalService.userId;
        this.societyComplaint.c_id = this.complaint.c_id;
        this.fireStore.collection('society').doc(GlobalService.societyId).collection('Complaints').doc(this.complaint.c_id).set({...this.societyComplaint});
        this.complaint.isSolved = "Unsolved";
        this.fireStore.collection('userDetails').doc(GlobalService.userId).collection('Complaint').doc(this.complaint.c_id).set({...this.complaint});
      });
        
        //console.log('name '+ this.name);

       
        //this.fireStore.collection('society').doc(GlobalService.societyId).collection('users').doc(GlobalService.userId).collection('Complaint').doc(this.complaint.c_id).set({...this.complaint});
        
        const increment = firebase.firestore.FieldValue.increment(1);
        this.fireStore.collection('userDetails').doc(GlobalService.userId).update({"no_of_comp": increment});
        this.fireStore.collection('society').doc(GlobalService.societyId).collection('users').doc(GlobalService.userId).update({"no_of_com": increment});
        this.showToast('Your complaint was filed successfully.');

       }
       catch(e){
        console.log(e);
        this.showToast(e);
        
      }
      (await loader).dismiss();
      }
  }
  formValidation(){
    if(!this.complaint.comp_type){
      this.showToast('Select Category of Complaint.');
      return false;
    }
    if(!this.complaint.issue){
      this.showToast('Please provide description for your complaint.');
      return false;
    }

    return true;
  }
  showToast(message: string){
    this.toastCtrl.create({message: message,duration:3000,}).then(toastData => toastData.present());
  }
}
