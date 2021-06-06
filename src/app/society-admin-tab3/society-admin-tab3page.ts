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

  lif: number;
  leak: number;
  par: number;
  sec: number;
  oth: number;
  tot: number;
  slif: number;
  sleak: number;
  spar: number;
  ssec: number;
  soth: number;
  stot: number;
  dismonth: any;
  disyear: any;
  complaints:any;
  complaintsSolved:any;

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
      this.lif=0;this.par=0;this.leak=0;this.sec=0;this.oth=0;
      this.slif=0;this.spar=0;this.sleak=0;this.ssec=0;this.soth=0;
      this.stot=0;
      this.tot=0;
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
  async getComplaintDetails(date: any){
    this.lif=0;this.par=0;this.leak=0;this.sec=0;this.oth=0;
      this.slif=0;this.spar=0;this.sleak=0;this.ssec=0;this.soth=0;
      this.stot=0;
      this.tot=0;
    var generationDate = new Date(date);
    var month = generationDate.getMonth();
    var year = generationDate.getFullYear();
    this.disyear = generationDate.getFullYear();
    this.dismonth = generationDate.toLocaleString('default', { month: 'short' });
    console.log(generationDate.getFullYear());

    console.log("Month ",month," Year", year);
    this.fireStore.collection('society').doc(GlobalService.societyId).collection('Complaints', ref => ref.where("mon", "==",month).where("year", "==", year)).snapshotChanges().subscribe( data => {
      this.complaints = data.map(e => {
        console.log("Month ",month," Year", year);
        console.log('Type ' + e.payload.doc.data()['type']);
        if(e.payload.doc.data()['comp_type'] == 'Parking' ){this.par+=1;}
        else if(e.payload.doc.data()['comp_type'] == 'Other'){this.oth+=1;}
        else if(e.payload.doc.data()['comp_type'] == 'Lift'){this.lif+=1;}
        else if(e.payload.doc.data()['comp_type'] == 'Leakage'){this.leak+=1;}
        else if(e.payload.doc.data()['comp_type'] == 'Security'){this.sec+=1;}
        this.tot = this.lif+this.par+this.leak+this.sec+this.oth;
      //   return{
      //   lift: this.lif,
      //   parking: this.par,
      //   leakage: this.leak,
      //   security: this.sec,
      //   others: this.oth,
      //   total : this.tot
      // };
      });
    });
    this.fireStore.collection('society').doc(GlobalService.societyId).collection('Complaints', ref => ref.where('mon', '==',month).where("year", "==", year).where("isSolved", "==", "Solved")).snapshotChanges().subscribe( data => {
      this.complaintsSolved = data.map(e => {
        console.log('Type ' + e.payload.doc.data()['type']);

        if(e.payload.doc.data()['comp_type'] == 'Parking' ){this.spar+=1;}
        else if(e.payload.doc.data()['comp_type'] == 'Other'){this.soth+=1;}
        else if(e.payload.doc.data()['comp_type'] == 'Lift'){this.slif+=1;}
        else if(e.payload.doc.data()['comp_type'] == 'Leakage'){this.sleak+=1;}
        else if(e.payload.doc.data()['comp_type'] == 'Security'){this.ssec+=1;}
        this.stot = this.slif+this.spar+this.sleak+this.ssec+this.soth;
      //   return{
      //   lift: lif,
      //   parking: par,
      //   leakage: leak,
      //   security: sec,
      //   others: oth,
      //   total : tot
      // };
      });
    });
  
  }
  
  showToast(message: string) {
    this.toastCtrl.create({ message: message, duration: 3000, }).then(toastData => toastData.present());
  }

}
