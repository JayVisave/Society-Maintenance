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


  user = {} as User;
  complaint = {} as Complaint;
  constructor(
    private toastCtrl: ToastController, 
    private loadingCtrl : LoadingController,
    private fireStore : AngularFirestore,
  ) {}
  ngOnInit() {
    this.getAllComplaints(event);
  }

  async getAllComplaints(event){
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
      this.fireStore.collection('society').doc('sFxpx7WgYy9ojV4pzgvJ').collection('users', ref => ref.where("no_of_com",">",0)).snapshotChanges().subscribe( data => {
         this.allComplaints = data.map(e => {
          console.log('Type ' + e.payload.doc.data()['type']);
          return{
            name: e.payload.doc.data()['name'],
            wing: e.payload.doc.data()['wing'],
            flat: e.payload.doc.data()['flat'],
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

  async resolveComplaint(user: User){
    if (this.formValidation()){
      let loader = this.loadingCtrl.create({
         message: 'Please wait...'
       });
      (await loader).present();
      try{
        this.generationDate = Date.now().toString();
        GlobalService.userId = await get('userId');
        console.log('Global ' +  GlobalService.userId);
        this.fireStore.collection('userDetails').doc(GlobalService.userId).collection('Complaint').doc(this.generationDate).set({...this.complaint});
        this.showToast('Your complaint was filed successfully.');
       }
       catch (e){
        console.log(e);
        this.showToast(e);
        
      }
      (await loader).dismiss();
      }
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
