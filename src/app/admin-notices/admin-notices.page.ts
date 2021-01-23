import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Notice } from '../models/notice.model';
import { get, GlobalService, set } from '../global.service';

@Component({
  selector: 'app-admin-notices',
  templateUrl: './admin-notices.page.html',
  styleUrls: ['./admin-notices.page.scss'],
})
export class AdminNoticesPage implements OnInit {

  generationDate: string;
  notice = {} as Notice;
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

        this.fireStore.firestore.collection('userDetails').doc(GlobalService.userId).get()
      .then(doc => {
         console.log('Document data:', doc.data()['societyID']);
        set('societyID',doc.data()['societyID']);
        // const comment = doc.data();   // get data in result variable
        // this.items = JSON.stringify(comment); // then convert data to json string
        // console.log("Items "+this.items);
        // this.allData = JSON.parse(this.items); // parse json data and pass json string
        // console.log("all data "+this.allData["isCommercial"]); // got result of particular string
        //map(data=>{});
        });
        this.generationDate = Date.now().toString();
        GlobalService.userId = await get('userId');
        GlobalService.societyId = await get('societyID');
        console.log('Global 1'+  GlobalService.userId);
        console.log('Global 2'+  GlobalService.societyId);
        this.notice.u_id = GlobalService.userId;
        this.notice.n_id= this.fireStore.createId();
        this.notice.date = notice.date;
        this.notice.desc = notice.desc;
        this.notice.title = notice.title;
        this.notice.type = notice.type;
        this.fireStore.collection('society').doc(GlobalService.societyId).collection('Notices').doc(this.notice.n_id).set({...this.notice});
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
    if(!this.notice.title){
      this.showToast('Please provide title for your notice.');
      return false;
    }
    if(!this.notice.date){
      this.showToast('Please provide date for your notice.');
      return false;
    }
    if(!this.notice.desc){
      this.showToast('Please provide description for notice.');
      return false;
    }
    if(!this.notice.type){
      this.showToast('Select type of notice.');
      return false;
    }
    return true;
  }
  showToast(message: string){
    this.toastCtrl.create({message: message,duration:3000,}).then(toastData => toastData.present());
  }
  

}
