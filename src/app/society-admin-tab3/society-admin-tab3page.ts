import { Component, OnInit } from '@angular/core';
import { get, GlobalService, set } from '../global.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-society-admin-tab3',
  templateUrl: './society-admin-tab3.page.html',
  styleUrls: ['./society-admin-tab3.page.scss'],
})
export class SocietyAdminTab3Page implements OnInit {


  complaints:any;
  complaintsSolved:any;
  isSet:boolean;
  constructor( private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private fireStore: AngularFirestore,) { }

  ngOnInit() {
    this.getInit();
  }

  async getInit() {
    let loader = this.loadingCtrl.create({
      message: 'Please wait...'
    });
    (await loader).present();
    try {
      this.isSet=false;
      GlobalService.userId = await get('userId');

      console.log('Global ' + GlobalService.userId);

      this.fireStore.firestore.collection('userDetails').doc(GlobalService.userId).get()
        .then(doc => {
          set('societyID', doc.data()['societyID']);
        });

      GlobalService.societyId = await get('societyID');
      console.log('Global ' + GlobalService.societyId);
      (await loader).dismiss();
    }
    catch (e) {
      this.showToast(e);
    }
    

  }
  getComplaintDetails(date: any){
    var generationDate = new Date(date);
    var month = generationDate.getMonth();
    var year = generationDate.getFullYear();
    console.log(generationDate.getFullYear());
    this.fireStore.collection('society').doc(GlobalService.societyId).collection('Complaints', ref => ref.where('mon', '==',month).where("year", "==", year)).snapshotChanges().subscribe( data => {
      this.complaints = data.map(e => {
        console.log('Type ' + e.payload.doc.data()['type']);
        var lif=0,leak=0,par=0,sec=0,oth=0,tot=0;
        if(e.payload.doc.data()['comp_type'] == 'Parking' ){par+=1;}
        else if(e.payload.doc.data()['comp_type'] == 'Other'){oth+=1;}
        else if(e.payload.doc.data()['comp_type'] == 'Lift'){lif+=1;}
        else if(e.payload.doc.data()['comp_type'] == 'Leakage'){leak+=1;}
        else if(e.payload.doc.data()['comp_type'] == 'Security'){sec+=1;}
        tot = lif+par+leak+sec+oth;
        return{
        lift: lif,
        parking: par,
        leakage: leak,
        security: sec,
        others: oth,
        total : tot
      };
      });
    });
    this.fireStore.collection('society').doc(GlobalService.societyId).collection('Complaints', ref => ref.where('mon', '==',month).where("year", "==", year).where("isSolved", "==", "Solved")).snapshotChanges().subscribe( data => {
      this.complaintsSolved = data.map(e => {
        console.log('Type ' + e.payload.doc.data()['type']);
        var lif=0,leak=0,par=0,sec=0,oth=0,tot=0;
        if(e.payload.doc.data()['comp_type'] == 'Parking' ){par+=1;}
        else if(e.payload.doc.data()['comp_type'] == 'Other'){oth+=1;}
        else if(e.payload.doc.data()['comp_type'] == 'Lift'){lif+=1;}
        else if(e.payload.doc.data()['comp_type'] == 'Leakage'){leak+=1;}
        else if(e.payload.doc.data()['comp_type'] == 'Security'){sec+=1;}
        tot = lif+par+leak+sec+oth;
        return{
        lift: lif,
        parking: par,
        leakage: leak,
        security: sec,
        others: oth,
        total : tot
      };
      });
    });
    this.isSet = true;
  }
  
  showToast(message: string) {
    this.toastCtrl.create({ message: message, duration: 3000, }).then(toastData => toastData.present());
  }

}
