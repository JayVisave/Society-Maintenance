import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { ToastController, LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Noc } from '../models/noc.model';
@Component({
  selector: 'app-admin-tab4',
  templateUrl: './admin-tab4.page.html',
  styleUrls: ['./admin-tab4.page.scss'],
})
export class AdminTab4Page implements OnInit {
  societyNames : any;
  public societyRef : string;
  allNOC: any;
  societyID : string;
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
      this.societyRef = SocietyID;
       this.fireStore.collection('society').doc(SocietyID).collection('NOC').snapshotChanges().subscribe( data => {
        this.allNOC = data.map(e => {
        
         console.log('Type ' + e.payload.doc.data()['type']);
         return{
           u_id: e.payload.doc.data()['u_id'],
           n_id: e.payload.doc.data()['n_id'],
           name: e.payload.doc.data()['name'],
           wing: e.payload.doc.data()['wing'],
           flat: e.payload.doc.data()['flat'],
           uname: e.payload.doc.data()['uname'],
           noc_type: e.payload.doc.data()['noc_type'],
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
  async resolveNOC(NOCRef: any){
   
    let loader = this.loadingCtrl.create({
       message: 'Please wait...'
     });
    (await loader).present();
    try{
      console.log("hello "+ NOCRef.n_id);
      console.log("hello 2 "+this.societyRef);
      this.fireStore.collection('society').doc(this.societyRef).collection('NOC').doc(NOCRef.n_id).delete();
      this.fireStore.collection('userDetails').doc(NOCRef.u_id).collection('NOC').doc(NOCRef.n_id).update({"isSolved": "Solved"});
     }
     catch (e){
      console.log(e);
      this.showToast(e);
      
    }
    (await loader).dismiss();
   
}
  showToast(message: string){
    this.toastCtrl.create({message: message, duration: 3000, }).then(toastData => toastData.present());
  }
}
