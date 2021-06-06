import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { ToastController, LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { get, GlobalService } from '../global.service';
import { Complaint } from '../models/complaint.model';

@Component({
  selector: 'app-admin-tab2',
  templateUrl: './admin-tab2.page.html',
  styleUrls: ['./admin-tab2.page.scss'],
})
export class AdminTab2Page implements OnInit {

  compe_type: any;
  issue: any;
  generationDate: string;
  allComplaints: any;
  currentComplaint: any;
  societyNames : any;
  public societyName : string;
  public societyRef : string;
  societyID : string;

  user = {} as User;
  complaint = {} as Complaint;
  constructor(
    private toastCtrl: ToastController, 
    private loadingCtrl : LoadingController,
    private fireStore : AngularFirestore,
  ) {}
  ngOnInit() {
    this.getSocietyDetails(event);
    //this.getAllComplaints(event);
  }
  async getSocietyDetails(event){
    const loader = this.loadingCtrl.create({
      message: 'Please wait...'
    });
    (await loader).present();
    try{
    this.fireStore.collection('society').snapshotChanges().subscribe(data => {
      this.societyNames = data.map(e=>{
        this.societyRef = e.payload.doc.data()['id'];
        return{
          name: e.payload.doc.data()['name'],
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
  async getAllComplaints(SocietyID: any){
    let loader = this.loadingCtrl.create({
      message: 'Please wait...'
    });
    (await loader).present();
    try{
      // ref => ref.where("no_of_comp",">",0)
      // this.fireStore.collection('userDetails').valueChanges().
      // this.fireStore.collection('userDetails', ref => ref.where("no_of_comp",">",0)).snapshotChanges().subscribe( data => {
      //   this.allComplaints = data.map(e => {
      //    console.log('Type ' + e.payload.doc.data()['type']);
      //    return{
      //      comp_type: e.payload.doc.data()['complaint.comp_type'],
      //      issue: e.payload.doc.data()['complaint.issue'],
      //    }
      //  })
      // })
      // this.fireStore.collection('society').doc(SocietyID).collection('users', ref => ref.where("no_of_com",">",0)).snapshotChanges().subscribe( data => {
      //    this.allComplaints = data.map(e => {
         
      //     console.log('Type ' + e.payload.doc.data()['type']);
      //     return{
      //       u_id: e.payload.doc.data()['u_id'],
      //       c_id: e.payload.doc.data()['c_id'],
      //       name: e.payload.doc.data()['name'],
      //       wing: e.payload.doc.data()['wing'],
      //       flat: e.payload.doc.data()['flat'],
      //     }
      //   })
      //  })
       this.fireStore.collection('society').doc(SocietyID).collection('Complaints',ref => ref.where("isSolved","==","Unsolved")).snapshotChanges().subscribe( data => {
        this.allComplaints = data.map(e => {
        
         console.log('Type ' + e.payload.doc.data()['type']);
         return{
           u_id: e.payload.doc.data()['u_id'],
           c_id: e.payload.doc.data()['c_id'],
           name: e.payload.doc.data()['name'],
           wing: e.payload.doc.data()['wing'],
           flat: e.payload.doc.data()['flat'],
           comp_type: e.payload.doc.data()['comp_type'],
         }
       })
      })
      
     }
     catch (e)
     {
       this.showToast(e);
     }
    (await loader).dismiss();
  }

  async resolveComplaint(complaintRef: any){
   
      let loader = this.loadingCtrl.create({
         message: 'Please wait...'
       });
      (await loader).present();
      try{
        console.log("hello "+ complaintRef.c_id);
        // this.fireStore.collection('society').doc(this.societyRef).collection('Complaints').doc(complaintRef.c_id).delete();
        this.fireStore.collection('society').doc(this.societyRef).collection('Complaints').doc(complaintRef.c_id).update({"isSolved": "Solved"});
        this.fireStore.collection('userDetails').doc(complaintRef.u_id).collection('Complaint').doc(complaintRef.c_id).update({"isSolved": "Solved"});
       }
       catch (e){
        console.log(e);
        this.showToast(e);
        
      }
      (await loader).dismiss();
     
  }
  formValidation(){
    if (!this.complaint.comp_type){
      this.showToast('Select Category of Complaint.');
      return false;
    }
    if (!this.complaint.issue){
      this.showToast('Please provide description for your complaint.');
      return false;
    }

    return true;
  }
  showToast(message: string){
    this.toastCtrl.create({message: message, duration: 3000, }).then(toastData => toastData.present());
  }
}
