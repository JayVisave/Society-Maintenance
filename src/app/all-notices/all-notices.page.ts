import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { get, GlobalService, set } from '../global.service';
@Component({
  selector: 'app-all-notices',
  templateUrl: './all-notices.page.html',
  styleUrls: ['./all-notices.page.scss'],
})

export class AllNoticesPage implements OnInit {
  notices: any;
  tempDate: string;
  constructor(    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private fireStore: AngularFirestore,) { 

  }

  ngOnInit() {
    this.getAllNotices(event);
  }
  async getAllNotices(event){
    let loader = this.loadingCtrl.create({
      message: 'Please wait...'
    });
    (await loader).present();
    try{

      GlobalService.userId = await get('userId');
     
      console.log('Global ' +  GlobalService.userId);

      // this.fireStore.firestore.collection('comments').doc('').get().then(snapshot => {
      //   snapshot.docs.forEach(doc => {
      //     const comment = doc.data()
      //     comment.userRef.get().then(snap => {
      //       comment.user = snap.data()
      //       this.comments.push(comment)
      //     })
      //   })
      // })

      this.fireStore.firestore.collection('userDetails').doc(GlobalService.userId).get()
      .then(doc => {
        set('societyID',doc.data()['societyID']);
        });

        GlobalService.societyId  = await get('societyID');
     
        this.fireStore.collection('society').doc(GlobalService.societyId).collection('Notices', ref => ref.orderBy('date', 'desc')).snapshotChanges().subscribe( data => {
          this.notices = data.map(e => {
            console.log('Type ' + e.payload.doc.data()['type']);
            var generationDate = new Date(e.payload.doc.data()['date']);
            this.tempDate = "";
            this.tempDate += generationDate.getDay()+" ";
            this.tempDate += generationDate.toLocaleString('default', { month: 'short' })+" ";
 
            this.tempDate += generationDate.getFullYear().toString()+" ";
            return{
            title: e.payload.doc.data()['title'],
            type: e.payload.doc.data()['type'],
            date: this.tempDate,
            n_id: e.payload.doc.data()['n_id'],
            desc: e.payload.doc.data()['desc'],
          };
          });
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
  showToast(message: string){
    this.toastCtrl.create({message: message, duration: 3000, }).then(toastData => toastData.present());
  }
}
