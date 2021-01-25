import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { get, GlobalService, set } from '../global.service';
@Component({
  selector: 'app-society-admin-tab2',
  templateUrl: './society-admin-tab2.page.html',
  styleUrls: ['./society-admin-tab2.page.scss'],
})
export class SocietyAdminTab2Page implements OnInit {

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
            this.tempDate += generationDate.getDate()+" ";
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
  async deleteNotice(notice_sent: any){
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
     
        this.fireStore.collection("society").doc(GlobalService.societyId).collection('Notices').doc(notice_sent.n_id).delete().then(function() {
          console.log("Notice successfully deleted!");
      }).catch(function(error) {
          console.error("Error removing document: ", error);
      });

       
      (await loader).dismiss();
    }
    catch (e){
      this.showToast(e);
    }
  

  }
  showToast(message: string){
    this.toastCtrl.create({message: message, duration: 3000, }).then(toastData => toastData.present());
  }
}

