import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { ToastController, LoadingController, NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { get, GlobalService } from '../global.service';
import { Complaint } from '../models/complaint.model';


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

  user = {} as User;
  complaint = {} as Complaint;
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
        console.log('Global '+  GlobalService.userId);
        this.complaint.isSolved = "Unsolved";
        this.fireStore.collection('userDetails').doc(GlobalService.userId).collection('Complaint').doc(this.generationDate).set({...this.complaint});
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
