import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Socket } from 'ngx-socket-io';
import { get, GlobalService, set } from '../global.service';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-home-discussion',
  templateUrl: './home-discussion.page.html',
  styleUrls: ['./home-discussion.page.scss'],
})
export class HomeDiscussionPage implements OnInit {
  nickname = '';
  userDetails : any;
  constructor(public navCtrl: NavController,private toastCtrl: ToastController,private fireStore : AngularFirestore,private loadingCtrl:LoadingController, private socket: Socket) { }
  // async getUser(){
 
  //   let loader = this.loadingCtrl.create({
  //      message: 'Please wait...'
  //    });
  //    (await loader).present();
  //    try{
    
  //     }
  //    catch(e){
  //     console.log(e);
  //     this.showToast(e);
      
  //   }
  //   (await loader).dismiss();
  //   }
  ngOnInit() {
   
  }
  async joinChat(){
    GlobalService.userId = await get('userId');

    console.log('Global 1'+  GlobalService.userId);

    this.fireStore.firestore.collection('userDetails').doc(GlobalService.userId).get()
  .then(doc => {
    this.userDetails =  [doc.data()].map(e => {
      this.socket.connect();
      this.socket.emit('set-nickname',e['name']);
      set('nickName',e['name']);
      this.navCtrl.navigateForward('chat/'+e['name']);
      return{
        
        name: e['name'],
      };
   
    });

    
    
  

   });
    // this.navCtrl.navigateForward('/chat/niand');

    // this.navCtrl.navigateForward('/chat');
  }
  showToast(message: string) {
    this.toastCtrl.create({ message, duration: 3000, }).then(toastData => toastData.present());
  }
  
}
