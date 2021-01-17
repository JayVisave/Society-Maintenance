import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Notice } from '../models/notice.model';
import { get, GlobalService } from '../global.service';

@Component({
  selector: 'app-admin-notices',
  templateUrl: './admin-notices.page.html',
  styleUrls: ['./admin-notices.page.scss'],
})
export class AdminNoticesPage implements OnInit {

  generationDate: string;
  notices : Notice;
  
  constructor(
    private toastCtrl: ToastController, 
    private loadingCtrl : LoadingController,
    private fireStore : AngularFirestore,
  ) {}
  ngOnInit() {
    // this.getComplaints(event);
  }

  // async getComplaints(event){
  //   let loader = this.loadingCtrl.create({
  //     message: 'Please wait...'
  //   });
  //   (await loader).present();
  //   try{
  //     GlobalService.userId = await get('userId');
  //     GlobalService.societyId = await get('societyID');
  //     console.log('Global '+  GlobalService.userId);
  //     console.log('Global '+  GlobalService.societyId);
  //     this.fireStore.collection('userDetails').doc(GlobalService.userId).collection('Complaint').snapshotChanges().subscribe( data=>{
  //        this.complaints = data.map(e=>{
  //         console.log('Type '+e.payload.doc.data()['type']);
  //         return{
  //           comp_type: e.payload.doc.data()['comp_type'],
  //           issue: e.payload.doc.data()['issue'],
  //           isSolved: e.payload.doc.data()['isSolved'],
  //         }
  //       })
  //      })
  //    }
  //    catch(e)
  //    {
  //      this.showToast(e);
  //    }
  //   (await loader).dismiss();
  // }

  async file_Notice(notice: Notice){
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

        this.notices.u_id = GlobalService.userId;
        this.notices.n_id= this.fireStore.createId();
        this.notices.date = notice.date;
        this.notices.desc = notice.desc;
        this.notices.title = notice.title;
        this.notices.type = notice.type;
        this.fireStore.collection('society').doc(GlobalService.societyId).collection('Notices').doc(this.notices.n_id).set({...this.notices});
        // this.fireStore.collection('userDetails').doc(GlobalService.userId).collection('Complaint').doc(this.complaint.c_id).set({...this.complaint});
      }
        
        //console.log('name '+ this.name);

    
        //this.fireStore.collection('society').doc(GlobalService.societyId).collection('users').doc(GlobalService.userId).collection('Complaint').doc(this.complaint.c_id).set({...this.complaint});    
        // const increment = firebase.firestore.FieldValue.increment(1);
        // this.fireStore.collection('userDetails').doc(GlobalService.userId).update({"no_of_comp": increment});
        // this.fireStore.collection('society').doc(GlobalService.societyId).collection('users').doc(GlobalService.userId).update({"no_of_com": increment});
        // this.showToast('Your complaint was filed successfully.');

       
       catch(e){
        console.log(e);
        this.showToast(e);
        
      }
      (await loader).dismiss();
      }
  }
  formValidation(){
    if(!this.notices.title){
      this.showToast('Please provide title for your notice.');
      return false;
    }
    if(!this.notices.date){
      this.showToast('Please provide date for your notice.');
      return false;
    }
    if(!this.notices.desc){
      this.showToast('Please provide description for notice.');
      return false;
    }
    if(!this.notices.type){
      this.showToast('Select type of notice.');
      return false;
    }
    return true;
  }
  showToast(message: string){
    this.toastCtrl.create({message: message,duration:3000,}).then(toastData => toastData.present());
  }
  

}
